<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Publish | Wareligent</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #f8fafc;
            --card-bg: #ffffff;
            --accent: #f97316;
            --accent-hover: #ea580c;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
            --danger: #ef4444;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background-color: var(--bg); color: var(--text-main); display: flex; justify-content: center; padding: 40px 15px; }

        .container { width: 100%; max-width: 580px; background: var(--card-bg); border-radius: 12px; border: 1px solid var(--border); box-shadow: 0 4px 12px rgba(0,0,0,0.03); padding: 32px; }
        
        .header { margin-bottom: 28px; }
        .header h2 { font-size: 1.5rem; font-weight: 700; color: var(--text-main); }
        .header p { font-size: 0.85rem; color: var(--text-muted); margin-top: 4px; }

        .form-group { margin-bottom: 20px; }
        label { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); display: block; margin-bottom: 8px; }

        input, textarea { width: 100%; padding: 12px 14px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 0.95rem; background: #fff; color: var(--text-main); transition: border-color 0.2s; outline: none; }
        input:focus, textarea:focus { border-color: var(--accent); }

        .image-input-container { display: flex; flex-direction: column; gap: 10px; }
        
        .input-row { display: flex; gap: 8px; align-items: center; }
        .btn-remove { background: #fef2f2; border: 1px solid #fca5a5; color: var(--danger); padding: 12px 14px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; white-space: nowrap; transition: background 0.2s; }
        .btn-remove:hover { background: #fee2e2; }

        .btn-add-img { background: transparent; border: 1px dashed var(--accent); color: var(--accent); width: 100%; padding: 10px; border-radius: 8px; font-weight: 600; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 8px; transition: background 0.2s; }
        .btn-add-img:hover { background: #fff7ed; }

        .hint { font-size: 0.75rem; color: var(--text-muted); margin-top: 6px; }
        .hint a { color: var(--accent); text-decoration: none; font-weight: 500; }

        .btn-submit { width: 100%; background: var(--accent); color: #fff; border: none; padding: 14px; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; margin-top: 10px; transition: background 0.2s; }
        .btn-submit:hover { background: var(--accent-hover); }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
            <h2>Publish Article</h2>
            <p>Share news and knowledge with the global community</p>
        </div>

        <form id="postForm">
            <div class="form-group">
                <label>Author</label>
                <input type="text" id="author" placeholder="John Doe" required>
            </div>

            <div class="form-group">
                <label>Title</label>
                <input type="text" id="title" placeholder="Enter headline..." required>
            </div>

            <div class="form-group">
                <label>Images (Max 7)</label>
                <div class="image-input-container" id="imageFields">
                    <div class="input-row">
                        <input type="url" class="img-url" placeholder="Main Cover Image URL" required>
                    </div>
                </div>
                
                <button type="button" class="btn-add-img" id="addImgBtn" onclick="addImageInput()">
                    + Add Another Image
                </button>
                
                <p class="hint">Upload images on <a href="https://imgbb.com" target="_blank">ImgBB</a> and paste direct links here.</p>
            </div>

            <div class="form-group">
                <label>Content</label>
                <textarea id="content" rows="6" placeholder="Write full article here..." required></textarea>
            </div>

            <button type="submit" class="btn-submit" id="submitBtn">Publish Article</button>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script>
        const SUPABASE_URL = 'https://xveccsbdrysuiwyuvodw.supabase.co';
        const SUPABASE_KEY = 'sb_publishable_HkyRE170ylT0kkdZxbwUSQ_ihHrS_Ra';
        const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        let imageCount = 1;

        function addImageInput() {
            if (imageCount >= 7) {
                alert("Maximum 7 images allowed.");
                return;
            }
            imageCount++;
            const container = document.getElementById('imageFields');
            
            const row = document.createElement('div');
            row.className = 'input-row';
            
            const newInput = document.createElement('input');
            newInput.type = 'url';
            newInput.className = 'img-url';
            newInput.placeholder = `Image ${imageCount} URL`;

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'btn-remove';
            removeBtn.innerText = 'Remove';
            removeBtn.onclick = function() {
                row.remove();
                imageCount--;
                document.getElementById('addImgBtn').style.display = 'flex';
            };

            row.appendChild(newInput);
            row.appendChild(removeBtn);
            container.appendChild(row);

            if (imageCount === 7) {
                document.getElementById('addImgBtn').style.display = 'none';
            }
        }

        document.getElementById('postForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            btn.innerText = 'Publishing...';
            btn.disabled = true;

            const inputs = document.querySelectorAll('.img-url');
            const imagesList = [];
            inputs.forEach(input => {
                if (input.value.trim() !== '') {
                    imagesList.push(input.value.trim());
                }
            });

            const author = document.getElementById('author').value;
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;

            const { error } = await supabaseClient.from('articles').insert([{ 
                author, 
                title, 
                image_url: imagesList.join(','), 
                content 
            }]);

            if (error) {
                alert('Error: ' + error.message);
                btn.innerText = 'Publish Article';
                btn.disabled = false;
            } else {
                alert('Article published successfully!');
                window.location.href = 'index.html';
            }
        });
    </script>
</body>
</html>
