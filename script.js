const appId = 'e79b0e3c'; // ใส่ App ID ที่ได้จาก Edamam
const appKey = 'c9257c51064a79889acb9299fbb86951'; // ใส่ App Key ที่ได้จาก Edamam

async function findRecipes() {
  const ingredients = document.getElementById('ingredients').value;
  const recipesSection = document.getElementById('recipes-section');
  
  // ล้างข้อมูลเก่าออกก่อน
  recipesSection.innerHTML = '';
  
  // ถ้าไมีการป้อนวัตถุดิบ เตือน
  if (!ingredients) {
    recipesSection.innerHTML = '<p>โปรดใส่วัตถุดิบของคุณ!</p>';
    return;
  }

  // เรียก API เพื่อดึงข้อมูลสูตรอาหาร
  try {
    const response = await fetch(`https://api.edamam.com/search?q=${ingredients}&app_id=${appId}&app_key=${appKey}`);
    
    // ตรวจสอบสถานะการตอบกลับจาก API
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.hits.length === 0) {
      recipesSection.innerHTML = '<p>No recipes found!</p>';
      return;
    }

    // แสดงผลข้อมูลสูตรอาหารที่ค้นหาเจอ
    data.hits.forEach(hit => {
      const recipe = hit.recipe;
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('recipe');

      recipeDiv.innerHTML = `
        <h3>${recipe.label}</h3>
        <img src="${recipe.image}" alt="${recipe.label}">
        <p>Calories: ${Math.round(recipe.calories)}</p>
        <p>Source: <a href="${recipe.url}" target="_blank">${recipe.source}</a></p>
      `;

      recipesSection.appendChild(recipeDiv);
    });
  } catch (error) {
    recipesSection.innerHTML = `<p>Error fetching recipes: ${error.message}. Please try again later.</p>`;
    console.error('Error:', error);
  }
}
