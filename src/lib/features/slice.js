import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCartItems,
  updateCartItem as updateCartItemAPI,
} from "@/services/cart-services";

// Helper for total quantity
const calculateTotal = (items) =>
  items.reduce((sum, item) => sum + (item.quantity || 0), 0);

// ====== INITIAL STATE ======
const initialState = {
  items: [], // All cart items
  isCartOpen: false, // Cart toggle
  total: 0, // Total quantity
  loading: false, // Async loading
  error: null, // Async error
};

// ====== ASYNC THUNKS ======
// Fetch cart items from API
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await getCartItems();
    return response.data;
  }
);

// Update cart item quantity via API
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, quantity, product_price }) => {
    const response = await updateCartItemAPI(id, { quantity, product_price });
    return response.data;
  }
);

// ====== SLICE ======
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add new item or increment existing
    addItem: (state, action) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      state.total = calculateTotal(state.items);
    },

    // Remove item from cart
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.total = calculateTotal(state.items);
    },

    // Increment quantity
    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
      state.total = calculateTotal(state.items);
    },

    // Decrement quantity
    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
      state.total = calculateTotal(state.items);
    },

    // Toggle cart UI
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    // Close cart UI
    closeCart: (state) => {
      state.isCartOpen = false;
    },

    // Set cart items directly (useful for syncing localStorage guest cart)
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.total = calculateTotal(state.items);
    },
  },

  extraReducers: (builder) => {
    // Fetch cart items
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.total = calculateTotal(state.items);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Update cart item
    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      const updated = action.payload;
      const index = state.items.findIndex((i) => i.id === updated.id);
      if (index !== -1) {
        state.items[index] = updated;
      }
      state.total = calculateTotal(state.items);
    });
  },
});

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  toggleCart,
  closeCart,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
