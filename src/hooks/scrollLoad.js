import { useState, useEffect } from 'react'

export const useScroll = (hookHandler) => {
  const [newItemLoading, setNewItemLoading] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (newItemLoading) hookHandler();
  }, [newItemLoading])

  const onScroll = () => {
    if (window.innerHeight + window.pageYOffset + 1000 >= document.body.offsetHeight) {
      setNewItemLoading(true);
    }
  };

  return { newItemLoading, setNewItemLoading }
}