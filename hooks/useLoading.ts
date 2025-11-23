"use client";

import { useState, useCallback } from "react";

interface UseLoadingReturn {
  /**
   * Whether the loading state is active
   */
  isLoading: boolean;
  /**
   * Start loading state
   */
  start: () => void;
  /**
   * Stop loading state
   */
  stop: () => void;
  /**
   * Toggle loading state
   */
  toggle: () => void;
  /**
   * Execute an async function with automatic loading state management
   */
  execute: <T>(asyncFn: () => Promise<T>) => Promise<T>;
}

/**
 * Hook for managing loading states in async UI flows.
 *
 * @example
 * const { isLoading, execute } = useLoading();
 *
 * const handleSubmit = async () => {
 *   await execute(async () => {
 *     await fetchData();
 *   });
 * };
 */
export function useLoading(initialState = false): UseLoadingReturn {
  const [isLoading, setIsLoading] = useState(initialState);

  const start = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stop = useCallback(() => {
    setIsLoading(false);
  }, []);

  const toggle = useCallback(() => {
    setIsLoading((prev) => !prev);
  }, []);

  const execute = useCallback(
    async <T,>(asyncFn: () => Promise<T>): Promise<T> => {
      try {
        setIsLoading(true);
        return await asyncFn();
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    start,
    stop,
    toggle,
    execute,
  };
}

