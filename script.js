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

    feedContainer.innerHTML = articles.map(item => {
        // Split comma-separated image URLs
        const images = item.image_url ? item.image_url.split(',') : [];
        const mainImage = images[0] || '';
        const extraImages = images.slice(1);

        return `
            <div class="news-card" style="background:#fff; border:1px solid #e5e7eb; border-radius:10px; overflow:hidden; margin-bottom:25px; padding:20px;">
                ${mainImage ? `<img src="${mainImage}" style="width:100%; max-height:350px; object-fit:cover; border-radius:8px; margin-bottom:15px;">` : ''}
                
                <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:10px;">${item.title || 'Untitled'}</h3>
                <p style="font-size:0.95rem; color:#374151; line-height:1.6; margin-bottom:15px;">${item.content || ''}</p>
                
                ${extraImages.length > 0 ? `
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap:10px; margin-bottom:15px;">
                        ${extraImages.map(img => `<img src="${img}" style="width:100%; height:100px; object-fit:cover; border-radius:6px;">`).join('')}
                    </div>
                ` : ''}

                <div style="font-size:0.75rem; color:#9ca3af; font-weight:500;">
                    By <strong>${item.author || 'Anonymous'}</strong> • ${item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Just now'}
                </div>
            </div>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', loadArticles);
