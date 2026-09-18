// Supabase Configuration
const SUPABASE_URL = 'https://xveccsbdrysuiwyuvodw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_HkyRE170ylT0kkdZxbwUSQ_ihHrS_Ra';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fetch and Display Articles
async function loadArticles() {
    const container = document.getElementById('news-feed');
    if (!container) return;

    const { data: articles, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_held', false)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching articles:', error);
        return;
    }

    if (!articles || articles.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#9ca3af; margin-top:20px;">No news published yet.</p>';
        return;
    }

    // Render articles dynamically
    container.innerHTML = articles.map(art => `
        <article class="news-card" data-id="${art.id}">
            <div class="news-header">
                <div class="author-info"><i class="fa-solid fa-user"></i> Posted by <strong>${art.author || 'Anonymous'}</strong></div>
                <div class="views-count"><i class="fa-solid fa-eye"></i> ${art.views || 0} Views</div>
            </div>
            <h2 class="news-title">${art.title}</h2>
            ${art.image_url ? `<img src="${art.image_url}" style="width:100%; max-height:400px; object-fit:cover; border-radius:12px; margin-bottom:12px;">` : ''}
            <p class="news-content">${art.content}</p>
            <div class="news-actions">
                <button class="action-btn like" onclick="handleLike(${art.id}, ${art.likes || 0})"><i class="fa-solid fa-thumbs-up"></i> <span>${art.likes || 0}</span></button>
                <button class="action-btn dislike" onclick="handleDislike(${art.id}, ${art.dislikes || 0})"><i class="fa-solid fa-thumbs-down"></i> <span>${art.dislikes || 0}</span></button>
                <button class="action-btn report" onclick="handleReport(${art.id}, ${art.reports || 0})"><i class="fa-solid fa-flag"></i> Report</button>
            </div>
        </article>
    `).join('');
}

// Like Article
async function handleLike(id, currentLikes) {
    await supabase.from('articles').update({ likes: currentLikes + 1 }).eq('id', id);
    loadArticles();
}

// Dislike Article
async function handleDislike(id, currentDislikes) {
    await supabase.from('articles').update({ dislikes: currentDislikes + 1 }).eq('id', id);
    loadArticles();
}

// Report Article (Auto-hold after 5 reports)
async function handleReport(id, currentReports) {
    const newCount = currentReports + 1;
    const isHeld = newCount >= 5;
    await supabase.from('articles').update({ reports: newCount, is_held: isHeld }).eq('id', id);
    alert(isHeld ? 'This article has been held for review due to multiple reports.' : 'Report submitted successfully!');
    loadArticles();
}

// Handle Article Submission (publish.html)
const publishForm = document.getElementById('publishForm');
if (publishForm) {
    publishForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('newsTitle').value;
        const image_url = document.getElementById('newsImage').value;
        const content = document.getElementById('newsContent').value;

        const { error } = await supabase.from('articles').insert([
            { title, image_url, content, author: 'Community User' }
        ]);

        if (error) {
            alert('Failed to publish article. Please try again.');
        } else {
            alert('Article published successfully!');
            window.location.href = 'index.html';
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadArticles);
