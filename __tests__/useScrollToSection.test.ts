/**
 * Unit tests for useScrollToSection hook
 * 
 * To run these tests, ensure Jest is configured in your project:
 * npm install --save-dev jest @testing-library/react @testing-library/react-hooks
 * 
 * Add to package.json:
 * "scripts": {
 *   "test": "jest"
 * }
 */

import { renderHook, act } from "@testing-library/react";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import type { NavigationLink } from "@/types";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
}));

// Mock window and document
const mockScrollTo = jest.fn();
const mockGetElementById = jest.fn();

beforeEach(() => {
  global.window = {
    ...global.window,
    scrollTo: mockScrollTo,
    location: { hash: "", href: "" },
    pageYOffset: 0,
    requestAnimationFrame: (cb: () => void) => {
      setTimeout(cb, 0);
      return 1;
    },
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  } as unknown as Window & typeof globalThis;

  global.document = {
    ...global.document,
    getElementById: mockGetElementById,
  } as unknown as Document;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("useScrollToSection", () => {
  const mockLinks: NavigationLink[] = [
    { href: "/#how-it-works", label: "how it works", isScroll: true },
    { href: "/#zones", label: "zones", isScroll: true },
  ];

  it("should initialize with null activeId", () => {
    const { result } = renderHook(() =>
      useScrollToSection({ links: mockLinks })
    );

    expect(result.current.activeId).toBeNull();
  });

  it("should provide scrollToId function", () => {
    const { result } = renderHook(() =>
      useScrollToSection({ links: mockLinks })
    );

    expect(typeof result.current.scrollToId).toBe("function");
    expect(typeof result.current.scrollToTop).toBe("function");
  });

  it("should handle scrollToId when element exists", () => {
    const mockElement = {
      getBoundingClientRect: () => ({ top: 100 }),
      offsetTop: 100,
      offsetHeight: 200,
    };

    mockGetElementById.mockReturnValue(mockElement);

    const { result } = renderHook(() =>
      useScrollToSection({ links: mockLinks })
    );

    act(() => {
      result.current.scrollToId("how-it-works");
    });

    // Wait for requestAnimationFrame
    setTimeout(() => {
      expect(mockGetElementById).toHaveBeenCalledWith("how-it-works");
    }, 10);
  });

  it("should handle scrollToTop", () => {
    const { result } = renderHook(() =>
      useScrollToSection({ links: mockLinks })
    );

    act(() => {
      result.current.scrollToTop();
    });

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});

