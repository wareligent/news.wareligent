// Supabase Configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // এখানে আপনার Supabase URL বসাবেন
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY'; // এখানে আপনার Supabase Anon Key বসাবেন

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fetch and Display Articles
async function loadArticles() {
    const container = document.querySelector('.container');
    if (!container) return;

    const { data: articles, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_held', false)
        .order('created_at', { ascending: false });

    if (error || !articles) return;

    // Render articles dynamically
    container.innerHTML = articles.map(art => `
        <article class="news-card" data-id="${art.id}">
            <div class="news-header">
                <div class="author-info"><i class="fa-solid fa-user"></i> Posted by <strong>${art.author}</strong></div>
                <div class="views-count"><i class="fa-solid fa-eye"></i> ${art.views} Views</div>
            </div>
            <h2 class="news-title">${art.title}</h2>
            ${art.image_url ? `<img src="${art.image_url}" style="width:100%; border-radius:12px; margin-bottom:12px;">` : ''}
            <p class="news-content">${art.content}</p>
            <div class="news-actions">
                <button class="action-btn like" onclick="handleLike(${art.id}, ${art.likes})"><i class="fa-solid fa-thumbs-up"></i> <span>${art.likes}</span></button>
                <button class="action-btn dislike" onclick="handleDislike(${art.id}, ${art.dislikes})"><i class="fa-solid fa-thumbs-down"></i> <span>${art.dislikes}</span></button>
                <button class="action-btn report" onclick="handleReport(${art.id}, ${art.reports})"><i class="fa-solid fa-flag"></i> Report</button>
            </div>
        </article>
    `).join('');
}

// Like Article Logic
async function handleLike(id, currentLikes) {
    await supabase.from('articles').update({ likes: currentLikes + 1 }).eq('id', id);
    loadArticles();
}

// Dislike Article Logic
async function handleDislike(id, currentDislikes) {
    await supabase.from('articles').update({ dislikes: currentDislikes + 1 }).eq('id', id);
    loadArticles();
}

// Report Logic (Auto-hold after 5 reports)
async function handleReport(id, currentReports) {
    const newCount = currentReports + 1;
    const isHeld = newCount >= 5; // 5টি রিপোর্ট হলে পোস্ট অটো হোল্ড হয়ে যাবে
    await supabase.from('articles').update({ reports: newCount, is_held: isHeld }).eq('id', id);
    alert(isHeld ? 'পোস্টটিতে একাধিক রিপোর্ট পাওয়ায় পর্যালোচনা করার জন্য হোল্ড করা হয়েছে।' : 'রিপোর্ট জমা হয়েছে!');
    loadArticles();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadArticles);
