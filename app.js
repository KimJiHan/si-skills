document.addEventListener('DOMContentLoaded', () => {
    // 테마 토글
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');

    // 시스템 테마 감지
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!prefersDark) {
        root.setAttribute('data-theme', 'light');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        root.setAttribute('data-theme', newTheme);
        
        if (newTheme === 'dark') {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        } else {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
    });

    // 데이터 Fetching 로직
    const grid = document.getElementById('trends-grid');
    const loading = document.getElementById('loading');
    const errorState = document.getElementById('error-message');
    const retryBtn = document.getElementById('retry-btn');
    const statsBar = document.getElementById('stats-bar');
    const totalNodesSpan = document.getElementById('total-nodes');
    const typeSelect = document.getElementById('type-select');
    const mainTitle = document.getElementById('main-title');

    // Modal elements
    const modal = document.getElementById('desc-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalBody = document.getElementById('modal-body');
    const modalLink = document.getElementById('modal-link');

    // Close modal handlers
    closeModal.onclick = () => { modal.classList.remove('show'); setTimeout(() => { modal.style.display = 'none'; }, 300); };
    window.onclick = (e) => { if (e.target === modal) { modal.classList.remove('show'); setTimeout(() => { modal.style.display = 'none'; }, 300); } };

    async function fetchTrends() {
        showLoading();
        
        try {
            const currentType = typeSelect.value;
            const currentTypeText = typeSelect.options[typeSelect.selectedIndex].text;
            const API_URL = `/api/trends?type=${currentType}`;
            
            // 타이틀 동적 변경
            mainTitle.textContent = `${currentTypeText} - 서울연구원 OpenAPI 테스터`;
            document.title = `${currentTypeText} | 서울연구원 OpenAPI 테스터`;

            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const textResponse = await response.text();
            
            // XML 파싱
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(textResponse, "text/xml");
            
            // 파싱 에러 확인
            const parseError = xmlDoc.getElementsByTagName("parsererror");
            if (parseError.length > 0) {
                throw new Error("XML 파싱 실패");
            }

            renderData(xmlDoc);
            
        } catch (error) {
            console.error('Fetch Error:', error);
            showError();
        }
    }

    function renderData(xmlDoc) {
        // 기존 컨텐츠 초기화
        grid.innerHTML = '';
        
        const totalNodes = xmlDoc.querySelector('total_nodes')?.textContent || '0';
        totalNodesSpan.textContent = parseInt(totalNodes).toLocaleString();
        
        const rows = xmlDoc.querySelectorAll('row');
        
        if (rows.length === 0) {
            grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: var(--text-secondary);">조회된 데이터가 없습니다.</p>';
            hideLoading();
            return;
        }

        const fragment = document.createDocumentFragment();

        Array.from(rows).forEach((row, index) => {
            const title = row.querySelector('title')?.textContent || '제목 없음';
            const descriptionHtml = row.querySelector('description')?.textContent || '';
            const dateStr = row.querySelector('date')?.textContent || '';
            const link = row.querySelector('identifier')?.textContent || '#';
            const type = row.querySelector('type')?.textContent || 'ARTICLE';
            
            // HTML 태그 제거 로직
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = descriptionHtml;
            const cleanDescription = tempDiv.textContent || tempDiv.innerText || '';

            // 날짜 포맷팅 (Tue, 31 Mar 2026 16:05:51 +0900 -> 2026. 03. 31)
            const dateObj = new Date(dateStr);
            const formattedDate = isNaN(dateObj) ? dateStr : 
                `${dateObj.getFullYear()}. ${String(dateObj.getMonth() + 1).padStart(2, '0')}. ${String(dateObj.getDate()).padStart(2, '0')}`;

            // 카드 엘리먼트 생성
            const card = document.createElement('a');
            card.href = link;
            card.target = "_blank";
            card.rel = "noopener noreferrer";
            card.className = `trend-card delay-${index % 6}`;
            
            card.innerHTML = `
                <div class="card-date">${formattedDate}</div>
                <h2 class="card-title">${title}</h2>
                <div class="card-desc">${cleanDescription}</div>
                <button class="read-more-btn">세부 내용 보기</button>
                <div class="card-footer">
                    <span class="card-type">${type.replace('_', ' ')}</span>
                    <svg class="card-link-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </div>
            `;
            
            fragment.appendChild(card);
            
            // 세부 내용 모달 띄우기 이벤트 바인딩
            const readMoreBtn = card.querySelector('.read-more-btn');
            readMoreBtn.addEventListener('click', (e) => {
                e.preventDefault(); // 기본 앵커 태그 이동 방지
                
                modalTitle.textContent = title;
                modalDate.textContent = formattedDate;
                // HTML 형태로 모달 바디에 렌더링
                modalBody.innerHTML = descriptionHtml;
                modalLink.href = link;
                
                modal.style.display = 'block';
                setTimeout(() => modal.classList.add('show'), 10);
            });

            // 등장 애니메이션 리스너 트리거
            setTimeout(() => {
                card.classList.add('visible');
            }, 50 + (index * 50));
        });

        grid.appendChild(fragment);
        hideLoading();
        
        // 통계 바 표시
        setTimeout(() => {
            statsBar.style.display = 'inline-block';
            requestAnimationFrame(() => {
                statsBar.style.opacity = '1';
            });
        }, 300);
    }

    function showLoading() {
        loading.style.display = 'flex';
        errorState.style.display = 'none';
        grid.style.display = 'none';
        statsBar.style.opacity = '0';
    }

    function hideLoading() {
        loading.style.display = 'none';
        errorState.style.display = 'none';
        grid.style.display = 'grid';
    }

    function showError() {
        loading.style.display = 'none';
        errorState.style.display = 'flex';
        grid.style.display = 'none';
        statsBar.style.display = 'none';
    }

    retryBtn.addEventListener('click', fetchTrends);
    typeSelect.addEventListener('change', fetchTrends);

    // Initial Fetch
    fetchTrends();
});
