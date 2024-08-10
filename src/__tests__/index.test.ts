import { renderHook } from '@testing-library/react';
import { usePathname, useParams } from 'next/navigation';
import { describe, expect, vi, beforeEach } from 'vitest';

import usePlaceholderPath from '../index';

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useParams: vi.fn(),
}));

describe('usePlaceholderPath', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('should handle a simple path without parameters', () => {
    vi.mocked(usePathname).mockReturnValue('/about');
    vi.mocked(useParams).mockReturnValue({});

    const { result } = renderHook(() => usePlaceholderPath());
    expect(result.current).toBe('/about');
  });

  test('should replace dynamic segments with placeholders', () => {
    vi.mocked(usePathname).mockReturnValue('/users/123/posts/456');
    vi.mocked(useParams).mockReturnValue({ userId: '123', postId: '456' });

    const { result } = renderHook(() => usePlaceholderPath());
    expect(result.current).toBe('/users/[userId]/posts/[postId]');
  });

  test('should handle catch-all routes', () => {
    vi.mocked(usePathname).mockReturnValue('/blog/2023/03/15');
    vi.mocked(useParams).mockReturnValue({ slug: ['2023', '03', '15'] });

    const { result } = renderHook(() => usePlaceholderPath());
    expect(result.current).toBe('/blog/[...slug]');
  });

  test('should handle URL-encoded characters', () => {
    vi.mocked(usePathname).mockReturnValue(
      '/users/%E3%81%82%E3%81%84%E3%81%86/posts/456',
    );
    vi.mocked(useParams).mockReturnValue({ userId: 'あいう', postId: '456' });

    const { result } = renderHook(() => usePlaceholderPath());
    expect(result.current).toBe('/users/[userId]/posts/[postId]');
  });

  test('should handle mixed regular and catch-all routes', () => {
    vi.mocked(usePathname).mockReturnValue('/users/123/posts/2023/03/15');
    vi.mocked(useParams).mockReturnValue({
      userId: '123',
      slug: ['2023', '03', '15'],
    });

    const { result } = renderHook(() => usePlaceholderPath());
    expect(result.current).toBe('/users/[userId]/posts/[...slug]');
  });

  test('should handle paths with query parameters', () => {
    vi.mocked(usePathname).mockReturnValue('/search?q=test');
    vi.mocked(useParams).mockReturnValue({});

    const { result } = renderHook(() => usePlaceholderPath());
    expect(result.current).toBe('/search');
  });
});
