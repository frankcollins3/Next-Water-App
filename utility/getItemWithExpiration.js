import React from 'react'

export default function getItemWithExpiration(key) {
    if (!key) return null;
    
    const item = JSON.parse(localStorage.getItem(key));
    if (!item) return null;
    if (new Date().getTime() > item.expiration) {
      localStorage.removeItem(key); // Remove item if expired
      return "/water_img/bite.png";
    }
    return item.value;
  }
  