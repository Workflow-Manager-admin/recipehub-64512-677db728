import React, { useState } from "react";
import "./RecipeHubContainer.css";

/**
 * Google OAuth
 * To use Google Sign-In, install the library:
 *   npm install @react-oauth/google
 *
 * Then, set your Google Client ID in <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
 * (See placeholder comment below for placement in index.js)
 */
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode"; // decode for getting the profile info


// Sample images (Unsplash placeholders)
const recipeImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", // Avocado Toast
  "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400&q=80", // Spaghetti Bolognese
  "https://images.unsplash.com/photo-1519864600265-abb244a666d6?w=400&q=80", // Chocolate Cake
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&q=80", // Lemonade
  "https://images.unsplash.com/photo-1504674900247-ec1e1fe90f2c?w=400&q=80", // Chicken Caesar Salad
];

/**
 * PUBLIC_INTERFACE
 * Main container for RecipeHub application.
 * Handles layout, theming, sidebar (categories), main area for browse/search, management, authentication etc.
 * Now includes theme switching and recipe card images.
 */
function RecipeHubContainer() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState("light"); // theme: "light" | "dark"
  const [googleUser, setGoogleUser] = useState(null); // For storing Google profile

  // PUBLIC_INTERFACE
  /**
   * Handle successful Google OAuth login.
   * @param {object} credentialResponse
   */
  function handleGoogleLoginSuccess(credentialResponse) {
    if (credentialResponse && credentialResponse.credential) {
      const decoded = jwt_decode(credentialResponse.credential);
      setIsAuthenticated(true);
      setGoogleUser({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Handle Google OAuth logout.
   */
  function handleGoogleLogout() {
    setIsAuthenticated(false);
    setGoogleUser(null);
    googleLogout();
  }

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

  // Add image field to each recipe for demonstration.
  const demoRecipes = [
    { id: 1, title: "Avocado Toast", category: "Breakfast", image: recipeImages[0] },
    { id: 2, title: "Spaghetti Bolognese", category: "Dinner", image: recipeImages[1] },
    { id: 3, title: "Chocolate Cake", category: "Dessert", image: recipeImages[2] },
    { id: 4, title: "Lemonade", category: "Drinks", image: recipeImages[3] },
    { id: 5, title: "Chicken Caesar Salad", category: "Lunch", image: recipeImages[4] },
  ];

  const filteredRecipes =
    selectedCategory === "All"
      ? demoRecipes.filter((r) =>
          r.title.toLowerCase().includes(search.toLowerCase())
        )
      : demoRecipes
          .filter((r) => r.category === selectedCategory)
          .filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));

  // Handle login/logout (stub)
  function handleAuth() {
    setIsAuthenticated((auth) => !auth);
  }

  // Theme toggle handler
  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  // Change the body class for application-wide theming
  React.useEffect(() => {
    document.body.classList.remove("rh-light-theme", "rh-dark-theme");
    document.body.classList.add(`rh-${theme}-theme`);
  }, [theme]);

  return (
    <div className={`rh-root rh-theme-${theme}`}>
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
              {/* --- GOOGLE LOGIN BUTTON BELOW --- */}
              <div style={{ marginTop: 8, marginBottom: 8 }}>
                {/* 
                  Replace 'YOUR_GOOGLE_CLIENT_ID_HERE' with your actual client ID below:
                  Wrap RecipeHubContainer in <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID_HERE"> ... </GoogleOAuthProvider> in index.js.
                */}
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    // Google login failed
                  }}
                  width="100%"
                />
              </div>
              <button className="rh-btn rh-btn-secondary">
                Register
              </button>
            </>
          ) : (
            <>
              {googleUser ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: 8,
                    marginTop: 2,
                  }}
                >
                  <img
                    src={googleUser.picture}
                    alt="Profile"
                    style={{ width: 36, height: 36, borderRadius: "50%" }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "1em" }}>{googleUser.name}</div>
                    <button
                      className="rh-btn rh-btn-accent rh-btn-sm"
                      style={{ marginTop: 4 }}
                      onClick={handleGoogleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button className="rh-btn rh-btn-accent" onClick={handleAuth}>
                  Logout
                </button>
              )}
            </>
          )}
          <button
            className="rh-btn rh-btn-sm rh-btn-theme"
            style={{ marginTop: 16 }}
            onClick={toggleTheme}
            aria-label="Toggle dark or light theme"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
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
              googleUser ? (
                <span className="rh-user-auth">
                  <img
                    src={googleUser.picture}
                    alt="Profile"
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      verticalAlign: "middle",
                      marginRight: 7,
                    }}
                  />
                  {googleUser.name}
                </span>
              ) : (
                <span className="rh-user-auth">👤 User</span>
              )
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
            {filteredRecipes.map((recipe, idx) => (
              <div key={recipe.id} className="rh-recipe-card">
                <div className="rh-recipe-image-wrap">
                  <img
                    className="rh-recipe-image"
                    src={recipe.image}
                    alt={recipe.title}
                    loading="lazy"
                  />
                </div>
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
