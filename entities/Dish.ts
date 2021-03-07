enum DishType {
    Takoyaki = 1,
    Katsudon = 2,
    Udon = 4,
    Ramen = 8,
    MatchaCookie = 16
};
  
enum DishSize {
    S = 1,
    M = 2,
    L = 4,
    XL = 8,
    XXL = 16
};

export default { 
    DishSize, 
    DishType 
}

// Takoyaki M x3; Udon XL x1; MatchaCookie S x5