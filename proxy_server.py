import http.server
import socketserver
import urllib.request
import urllib.parse
from urllib.error import URLError, HTTPError

PORT = 8000
API_URL = "https://www.si.re.kr/api"
API_KEY = "qkaM0U1H1OoH5Tp"

class ProxyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        # /api/trends 경로로 요청이 오면 서울연구원 API로 프록시
        if parsed_path.path == '/api/trends':
            query_params = urllib.parse.parse_qs(parsed_path.query)
            data_type = query_params.get('type', ['world_trends'])[0]
            self.handle_api_proxy(data_type)
        else:
            # 그 외의 요청은 일반 정적 파일(index.html, style.css 등) 제공
            super().do_GET()

    def handle_api_proxy(self, data_type):
        # 1. API에 보낼 POST 데이터 구성
        data = {
            'key': API_KEY,
            'command': 'extract',
            'type': data_type
        }
        encoded_data = urllib.parse.urlencode(data).encode('utf-8')
        
        # 2. API 요청 생성
        req = urllib.request.Request(API_URL, data=encoded_data)
        req.add_header('Content-Type', 'application/x-www-form-urlencoded')
        
        try:
            # 3. API 서버로 요청 보내기
            with urllib.request.urlopen(req) as response:
                result = response.read()
                
            # 4. 프론트엔드로 응답 전달
            self.send_response(200)
            self.send_header('Content-type', 'application/xml')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(result)
            
        except HTTPError as e:
            self.send_response(e.code)
            self.end_headers()
            self.wfile.write(b"Error fetching data from API.")
        except URLError as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(b"Failed to connect to API.")

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), ProxyHTTPRequestHandler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        print("프록시 서버가 정상적으로 실행되었습니다. 브라우저에서 접속하세요.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
