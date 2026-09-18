// Supabase Configuration
const SUPABASE_URL = 'https://xveccsbdrysuiwyuvodw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_HkyRE170ylT0kkdZxbwUSQ_ihHrS_Ra';

// window.supabaseClient ব্যবহার করা হয়েছে যেন ভ্যারিয়েবল ওভারল্যাপ না করে
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fetch & Display Articles
async function loadArticles() {
    const feedContainer = document.getElementById('news-feed');
    if (!feedContainer) return;

    const { data: articles, error } = await supabaseClient
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Supabase Error:', error);
        feedContainer.innerHTML = '<p style="color: red;">Error loading feed. Check console for details.</p>';
        return;
    }

    if (!articles || articles.length === 0) {
        feedContainer.innerHTML = '<p>No articles published yet.</p>';
        return;
    }

    feedContainer.innerHTML = articles.map(item => `
        <div style="background:#fff; border:1px solid #e5e7eb; padding:15px; border-radius:8px; margin-bottom:15px;">
            <h3 style="font-size:1.1rem; margin-bottom:6px; color:#111827;">${item.title || 'Untitled'}</h3>
            <p style="font-size:0.9rem; color:#4b5563; font-family:'Georgia', serif; line-height:1.6;">${item.content || ''}</p>
            <span style="font-size:0.75rem; color:#9ca3af; display:block; margin-top:8px;">
                Posted by <strong>${item.author || 'Anonymous'}</strong> • ${item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Just now'}
            </span>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadArticles);
