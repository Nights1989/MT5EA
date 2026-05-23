const API_BASE = 'https://polaris-backend.catalinanapelon755.workers.dev';  // 请替换为你的 Worker 实际地址

function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function clearToken() {
    localStorage.removeItem('token');
}

async function apiFetch(path, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    });
    const data = await response.json();
    if (response.status === 401) {
        clearToken();
        window.location.href = '/login.html';
        throw new Error('未认证');
    }
    if (!response.ok) {
        throw new Error(data.error || '请求失败');
    }
    return data;
}

async function fetchCurrentUser() {
    return await apiFetch('/api/user');
}

async function updateStarsDisplay() {
    try {
        const user = await fetchCurrentUser();
        if (document.getElementById('userStars')) {
            document.getElementById('userStars').innerText = user.stars_balance;
            document.getElementById('userTotalStars').innerText = user.total_stars_charged;
        }
    } catch(e) {
        console.error(e);
    }
}

function getRoleText(role) {
    if (role === 'super_admin') return '超级管理员';
    if (role === 'agent') return '代理商';
    return '普通用户';
}

function logout() {
    clearToken();
    window.location.href = '/login.html';
}