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
        feedContainer.innerHTML = '<p style="color:#64748b;">No articles published yet. Click "Submit Article" to write one!</p>';
        return;
    }

    feedContainer.innerHTML = articles.map(item => {
        const images = item.image_url ? item.image_url.split(',') : [];
        const mainImage = images[0] || '';
        const extraImages = images.slice(1);

        return `
            <article style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; margin-bottom:24px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
                ${mainImage ? `<img src="${mainImage}" style="width:100%; max-height:380px; object-fit:cover; display:block;">` : ''}
                
                <div style="padding:24px;">
                    <h2 style="font-size:1.25rem; font-weight:700; color:#0f172a; margin-bottom:10px; line-height:1.4;">${item.title || 'Untitled'}</h2>
                    <p style="font-size:0.92rem; color:#334155; line-height:1.6; margin-bottom:16px;">${item.content || ''}</p>
                    
                    ${extraImages.length > 0 ? `
                        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap:8px; margin-bottom:16px;">
                            ${extraImages.map(img => `<img src="${img}" style="width:100%; height:90px; object-fit:cover; border-radius:6px; border:1px solid #e2e8f0;">`).join('')}
                        </div>
                    ` : ''}

                    <div style="font-size:0.75rem; color:#64748b; border-top:1px solid #f1f5f9; padding-top:12px; display:flex; justify-content:space-between;">
                        <span>By <strong>${item.author || 'Anonymous'}</strong></span>
                        <span>${item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Just now'}</span>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', loadArticles);
