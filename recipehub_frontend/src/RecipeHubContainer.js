import React, { useState } from "react";
import "./RecipeHubContainer.css";

// PUBLIC_INTERFACE
function RecipeHubContainer() {
  /**
   * Main container for RecipeHub application.
   * Handles layout, theming, sidebar (categories), main area for browse/search, management, authentication etc.
   * This version provides structure and visual foundation; feature logic is stubbed with placeholders.
   */
  // Demo placeholder state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Demo categories and recipes (to be replaced by API/real data)
  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snacks",
    "Drinks",
  ];

  const demoRecipes = [
    { id: 1, title: "Avocado Toast", category: "Breakfast" },
    { id: 2, title: "Spaghetti Bolognese", category: "Dinner" },
    { id: 3, title: "Chocolate Cake", category: "Dessert" },
    { id: 4, title: "Lemonade", category: "Drinks" },
    { id: 5, title: "Chicken Caesar Salad", category: "Lunch" },
  ];

  const filteredRecipes =
    selectedCategory === "All"
      ? demoRecipes.filter((r) =>
          r.title.toLowerCase().includes(search.toLowerCase())
        )
      : demoRecipes
          .filter((r) => r.category === selectedCategory)
          .filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));

  // Stub login/logout
  function handleAuth() {
    setIsAuthenticated((auth) => !auth);
  }

  return (
    <div className="rh-root">
      <aside className="rh-sidebar">
        <div className="rh-sidebar-header">
          <span className="rh-logo">
            <span className="rh-logo-accent">🍲</span>
            RecipeHub
          </span>
        </div>
        <nav className="rh-categories">
          <div className="rh-categories-title">Categories</div>
          <ul>
            {categories.map((cat) => (
              <li
                key={cat}
                className={
                  selectedCategory === cat ? "active rh-category" : "rh-category"
                }
                onClick={() => setSelectedCategory(cat)}
                tabIndex={0}
              >
                {cat}
              </li>
            ))}
          </ul>
        </nav>
        <div className="rh-sidebar-footer">
          {!isAuthenticated ? (
            <>
              <button className="rh-btn rh-btn-primary" onClick={handleAuth}>
                Login
              </button>
              <button className="rh-btn rh-btn-secondary" style={{ marginTop: 8 }}>
                Register
              </button>
            </>
          ) : (
            <button className="rh-btn rh-btn-accent" onClick={handleAuth}>
              Logout
            </button>
          )}
        </div>
      </aside>
      <main className="rh-main">
        <header className="rh-main-header">
          <div className="rh-search-bar">
            <input
              className="rh-search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes..."
            />
            {isAuthenticated && (
              <button
                className="rh-btn rh-btn-primary"
                style={{ marginLeft: 8 }}
                title="Add Recipe"
              >
                + Add Recipe
              </button>
            )}
          </div>
          <div className="rh-user-placeholder">
            {isAuthenticated ? (
              <span className="rh-user-auth">👤 User</span>
            ) : (
              <span className="rh-user-notauth">Not logged in</span>
            )}
          </div>
        </header>
        <section className="rh-main-content">
          {/* Recipes browsing and management */}
          <h2 className="rh-section-title">
            {selectedCategory === "All"
              ? "All Recipes"
              : `${selectedCategory} Recipes`}
          </h2>
          <div className="rh-recipe-list">
            {filteredRecipes.length === 0 && (
              <div className="rh-no-recipes">No recipes found.</div>
            )}
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="rh-recipe-card">
                <div className="rh-recipe-title">{recipe.title}</div>
                <div className="rh-recipe-category">{recipe.category}</div>
                {isAuthenticated && (
                  <div className="rh-recipe-actions">
                    <button className="rh-btn rh-btn-secondary rh-btn-sm rh-card-btn">
                      Edit
                    </button>
                    <button className="rh-btn rh-btn-accent rh-btn-sm rh-card-btn">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default RecipeHubContainer;
