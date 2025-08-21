// Form Validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();
  const msg = document.getElementById("formMsg");

  if (!name || !email || !phone || !message) {
    setMsg(msg, "⚠️ Please fill in all fields.", "red");
    return;
  }

  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email)) {
    setMsg(msg, "⚠️ Enter a valid email address.", "red");
    return;
  }

  if (/^\\d{10}$/.test(phone)) {
    setMsg(msg, "⚠️ Enter a valid 10-digit phone number.", "red");
    return;
  }

  // Show success message
  setMsg(msg, "✅ Form submitted successfully!", "green");

  // Reset form after 2 seconds
  setTimeout(() => {
    document.getElementById("contactForm").reset();
    msg.textContent = "";
  }, 2000);
});

function setMsg(el, text, color) {
  el.style.color = color;
  el.textContent = text;
}

// Dynamic Image Gallery with random numbering
document.getElementById("addBtn").addEventListener("click", addImage);
document.getElementById("imageUrl").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addImage();
  }
});

function addImage() {
  const input = document.getElementById("imageUrl");
  const url = input.value.trim();
  if (!url) {
    alert("Please enter an image URL.");
    return;
  }

  const gallery = document.getElementById("gallery");

  // Generate random number label between 1000 and 9999
  const rand = Math.floor(1000 + Math.random() * 9000);
  const label = `Photo #${rand}`;

  const item = document.createElement("div");
  item.className = "gallery-item";

  const img = document.createElement("img");
  img.src = url;
  img.alt = label;
  img.title = label;

  // Only show placeholder if image fails to load
  img.onerror = function() {
    this.onerror = null;
    this.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(label)}`;
  };

  const caption = document.createElement("div");
  caption.className = "caption";
  caption.textContent = label;

  const delBtn = document.createElement("button");
  delBtn.className = "delete-btn";
  delBtn.type = "button";
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    item.remove();
  });

  item.appendChild(img);
  item.appendChild(caption);
  item.appendChild(delBtn);
  gallery.appendChild(item);

  input.value = "";
}
