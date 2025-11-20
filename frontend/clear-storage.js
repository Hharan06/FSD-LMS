// Quick script to clear localStorage if you encounter persistent issues
// Run this in browser console: localStorage.clear(); sessionStorage.clear(); location.reload();

console.log('Clearing localStorage and sessionStorage...');
localStorage.clear();
sessionStorage.clear();
console.log('Storage cleared! Reloading page...');
location.reload();
