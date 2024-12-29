import { describe, test, expect, vi, beforeEach, Mock } from "vitest";
import { fetchUserData, getCurrentTime } from "../api";
import { UserService } from "../user-service";

vi.mock("../api", () => {
  return {
    default: {},
    fetchUserData: vi.fn().mockImplementation(async () => ({
      id: "123",
      name: "Test User",
    })),
    getCurrentTime: vi.fn().mockImplementation(() => {
      return new Date().toISOString();
    }),
  };
});

describe("Vitest Mocking Examples", () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("1. Basic Function Mocking", () => {
    test("mocking a simple function", () => {
      // Create a mock function
      const mockFn = vi.fn();

      // Configure mock return value
      mockFn.mockReturnValue("mocked value");

      // Use the mock
      const result = mockFn();

      // Assertions
      expect(result).toBe("mocked value");
      expect(mockFn).toHaveBeenCalled();
    });

    test("mocking with different return values", () => {
      const mockFn = vi
        .fn()
        .mockReturnValueOnce("first call")
        .mockReturnValueOnce("second call")
        .mockReturnValue("default");

      expect(mockFn()).toBe("first call");
      expect(mockFn()).toBe("second call");
      expect(mockFn()).toBe("default");
    });
  });

  describe("2. Module Mocking", () => {
    test("mocking entire module", async () => {
      // Verify the mock is properly set up
      expect(fetchUserData).toBeDefined();

      const userData = await fetchUserData("123");

      expect(userData).toEqual({
        id: "123",
        name: "Test User",
      });
      expect(fetchUserData).toHaveBeenCalledWith("123");
    });
  });

  describe("3. Spying on Methods", () => {
    test("spying on class method", () => {
      const userService = new UserService();
      const spy = vi.spyOn(userService, "getAccessTime");

      // Mock implementation
      spy.mockReturnValue("2024-01-01T00:00:00.000Z");

      const result = userService.getAccessTime();

      expect(result).toBe("2024-01-01T00:00:00.000Z");
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("4. Timer Mocking", () => {
    test("mocking timers", () => {
      // Setup timer mock
      vi.useFakeTimers();

      const mockDate = new Date("2024-01-01T00:00:00.000Z");
      vi.setSystemTime(mockDate);

      const time = getCurrentTime();

      expect(time).toBe("2024-01-01T00:00:00.000Z");

      // Cleanup
      vi.useRealTimers();
    });
  });

  describe("5. Async Function Mocking", () => {
    test("mocking async functions", async () => {
      const mockAsyncFn = vi.fn().mockImplementation(async () => {
        return { data: "mocked data" };
      });

      const result = await mockAsyncFn();

      expect(result).toEqual({ data: "mocked data" });
      expect(mockAsyncFn).toHaveBeenCalled();
    });
  });

  describe("6. Partial Mocking", () => {
    test("partially mocking a module", async () => {
      const userService = new UserService();

      // Instead of re-mocking, just update the implementation for this test
      (fetchUserData as Mock).mockImplementationOnce(async () => ({
        id: "123",
        name: "Partial Mock",
      }));

      const result = await userService.getUser("123");

      expect(result.name).toBe("Partial Mock");
    });
  });

  describe("7. Global Mocking", () => {
    test("mocking global objects", () => {
      const mockIntersectionObserver = vi.fn(() => ({
        disconnect: vi.fn(),
        observe: vi.fn(),
        takeRecords: vi.fn(),
        unobserve: vi.fn(),
      }));

      const mockElement = {
        tagName: "DIV",
        id: "test",
      };

      vi.stubGlobal("IntersectionObserver", mockIntersectionObserver);
      vi.stubGlobal("document", { body: mockElement });

      // Test the mock
      const observer = new IntersectionObserver(() => {});
      observer.observe(document.body);

      expect(mockIntersectionObserver).toHaveBeenCalled();
      expect(observer.observe).toHaveBeenCalledWith(mockElement);
    });
  });
});
