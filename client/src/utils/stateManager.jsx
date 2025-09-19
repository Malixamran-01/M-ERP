// State Management Utility for Madrasa ERP
// Provides centralized state management and persistence

class StateManager {
  constructor() {
    this.state = {};
    this.listeners = {};
    this.persistentKeys = new Set();
  }

  // Initialize state manager
  initialize() {
    this.loadPersistentState();
  }

  // Set state value
  setState(key, value, persistent = false) {
    const oldValue = this.state[key];
    this.state[key] = value;

    // Mark as persistent if needed
    if (persistent) {
      this.persistentKeys.add(key);
      this.savePersistentState(key, value);
    }

    // Notify listeners
    this.notifyListeners(key, value, oldValue);
  }

  // Get state value
  getState(key) {
    return this.state[key];
  }

  // Subscribe to state changes
  subscribe(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);

    // Return unsubscribe function
    return () => {
      this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
    };
  }

  // Notify listeners of state changes
  notifyListeners(key, newValue, oldValue) {
    if (this.listeners[key]) {
      this.listeners[key].forEach(callback => {
        try {
          callback(newValue, oldValue);
        } catch (error) {
          console.error(`State listener error for key "${key}":`, error);
        }
      });
    }
  }

  // Clear state
  clearState(key) {
    if (key) {
      delete this.state[key];
      this.persistentKeys.delete(key);
      localStorage.removeItem(`madrasa_state_${key}`);
      this.notifyListeners(key, undefined, this.state[key]);
    } else {
      // Clear all state
      Object.keys(this.state).forEach(k => {
        this.clearState(k);
      });
    }
  }

  // Save persistent state to localStorage
  savePersistentState(key, value) {
    try {
      localStorage.setItem(`madrasa_state_${key}`, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save persistent state for key "${key}":`, error);
    }
  }

  // Load persistent state from localStorage
  loadPersistentState() {
    try {
      // Get all localStorage keys that start with our prefix
      const keys = Object.keys(localStorage).filter(key => 
        key.startsWith('madrasa_state_')
      );

      keys.forEach(key => {
        const stateKey = key.replace('madrasa_state_', '');
        const value = localStorage.getItem(key);
        
        if (value) {
          try {
            this.state[stateKey] = JSON.parse(value);
            this.persistentKeys.add(stateKey);
          } catch (error) {
            console.error(`Failed to parse persistent state for key "${stateKey}":`, error);
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.error('Failed to load persistent state:', error);
    }
  }

  // Get all state
  getAllState() {
    return { ...this.state };
  }

  // Reset all state
  reset() {
    this.clearState();
    this.state = {};
    this.listeners = {};
    this.persistentKeys.clear();
  }

  // Export state (for debugging)
  exportState() {
    return {
      state: this.getAllState(),
      persistentKeys: Array.from(this.persistentKeys)
    };
  }

  // Import state (for debugging)
  importState(data) {
    if (data.state) {
      Object.keys(data.state).forEach(key => {
        this.setState(key, data.state[key], data.persistentKeys?.includes(key));
      });
    }
  }
}

// Create singleton instance
const stateManager = new StateManager();

// Initialize on import
stateManager.initialize();

export default stateManager;

// React hook for using state manager
export const useStateManager = (key, defaultValue = null, persistent = false) => {
  const [value, setValue] = React.useState(() => 
    stateManager.getState(key) ?? defaultValue
  );

  React.useEffect(() => {
    // Subscribe to state changes
    const unsubscribe = stateManager.subscribe(key, (newValue) => {
      setValue(newValue);
    });

    // Set initial value if not set
    if (stateManager.getState(key) === undefined && defaultValue !== null) {
      stateManager.setState(key, defaultValue, persistent);
    }

    return unsubscribe;
  }, [key, defaultValue, persistent]);

  const setStateValue = React.useCallback((newValue) => {
    stateManager.setState(key, newValue, persistent);
  }, [key, persistent]);

  return [value, setStateValue];
};






