const SUPABASE_URL = 'https://xveccsbdrysuiwyuvodw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_HkyRE170ylT0kkdZxbwUSQ_ihHrS_Ra';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadArticles() {
    const feedContainer = document.getElementById('news-feed');
    if (!feedContainer) return;

    const { data: articles, error } = await supabaseClient
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Supabase Error:', error);
        feedContainer.innerHTML = '<p style="color: red;">Error loading articles.</p>';
        return;
    }

    if (!articles || articles.length === 0) {
        feedContainer.innerHTML = '<p style="color:#6b7280;">No articles published yet. Click "Submit Article" to publish the first one!</p>';
        return;
    }

    feedContainer.innerHTML = articles.map(item => `
        <div class="news-card">
            ${item.image_url ? `<img src="${item.image_url}" alt="News Image">` : ''}
            <div class="news-card-content">
                <h3>${item.title || 'Untitled'}</h3>
                <p>${item.content || ''}</p>
                <div class="news-meta">
                    By <strong>${item.author || 'Anonymous'}</strong> • ${item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Just now'}
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadArticles);
