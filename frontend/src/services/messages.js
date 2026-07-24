const serverMessageTranslations = {
  "Token manquant ou invalide": "Missing or invalid token",
  "Token invalide ou expiré": "Invalid or expired token",
  "Tous les champs sont obligatoires": "All fields are required",
  "Cet utilisateur existe déjà": "This user already exists",
  "Utilisateur créé avec succès": "Account created successfully",
  "Erreur serveur": "Server error",
  "Email et mot de passe obligatoires": "Email and password are required",
  "Email ou mot de passe incorrect": "Incorrect email or password",
  "Connexion réussie": "Login successful",
  "Le panier est vide": "Your cart is empty",
  "Commande créée avec succès": "Order placed successfully",
};

export const getEnglishMessage = (message, fallback) =>
  serverMessageTranslations[message] || fallback;
