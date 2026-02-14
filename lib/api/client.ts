const USE_MOCKS = process.env.USE_MOCKS === "true" || process.env.NEXT_PUBLIC_USE_MOCKS === "true";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1";

export async function fetchApi<T>(path: string, params?: Record<string, string>): Promise<T> {
  if (USE_MOCKS) {
    return fetchMock<T>(path, params);
  }

  const url = new URL(`${API_BASE}${path}`, "http://localhost");
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }

  const res = await fetch(url.pathname + url.search, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

async function fetchMock<T>(path: string, params?: Record<string, string>): Promise<T> {
  // Map API paths to mock file imports
  const mockMap: Record<string, () => Promise<unknown>> = {
    "/places": () => import("@/mocks/places.json"),
    "/menus/today": () => import("@/mocks/menus-today.json"),
    "/cinema/showtimes": () => import("@/mocks/cinema-showtimes.json"),
    "/theatre/program": () => import("@/mocks/theatre-program.json"),
    "/wineries": () => import("@/mocks/wineries.json"),
    "/events": () => import("@/mocks/events.json"),
    "/activities": () => import("@/mocks/activities.json"),
    "/businesses": () => import("@/mocks/businesses.json"),
    "/offices": () => import("@/mocks/offices.json"),
    "/notices": () => import("@/mocks/notices.json"),
    "/council": () => import("@/mocks/council.json"),
    "/classifieds": () => import("@/mocks/classifieds.json"),
    "/news": () => import("@/mocks/news.json"),
    "/map/places": () => import("@/mocks/map-markers.json"),
    "/dashboard/config": () => import("@/mocks/dashboard-config.json"),
  };

  // Handle parameterized paths — detail routes
  const detailPatterns: Array<{
    regex: RegExp;
    resolve: (match: RegExpMatchArray) => Promise<T>;
  }> = [
    {
      regex: /^\/places\/(.+)$/,
      resolve: async (m) => {
        const mod = await import(`@/mocks/place-details/${m[1]}.json`);
        return (mod.default ?? mod) as T;
      },
    },
    {
      regex: /^\/menus\/today\/(.+)$/,
      resolve: async (m) => {
        const allMenus = await import("@/mocks/menus-today.json");
        const data = (allMenus.default ?? allMenus) as { data: Array<{ place?: { slug?: string } }> };
        const menu = data.data.find((item) => item.place?.slug === m[1]);
        if (!menu) throw new Error(`Mock not found: menu for ${m[1]}`);
        return menu as T;
      },
    },
    {
      regex: /^\/wineries\/(.+)$/,
      resolve: async (m) => {
        const mod = await import(`@/mocks/winery-details/${m[1]}.json`);
        return (mod.default ?? mod) as T;
      },
    },
    {
      regex: /^\/events\/(.+)$/,
      resolve: async (m) => {
        const mod = await import(`@/mocks/event-details/${m[1]}.json`);
        return (mod.default ?? mod) as T;
      },
    },
    {
      regex: /^\/activities\/(.+)$/,
      resolve: async (m) => {
        const all = await import("@/mocks/activities.json");
        const data = (all.default ?? all) as { data: Array<{ id: string }> };
        const item = data.data.find((a) => a.id === m[1]);
        if (!item) throw new Error(`Mock not found: activity ${m[1]}`);
        return item as T;
      },
    },
    {
      regex: /^\/businesses\/(.+)$/,
      resolve: async (m) => {
        const all = await import("@/mocks/businesses.json");
        const data = (all.default ?? all) as { data: Array<{ slug: string }> };
        const item = data.data.find((b) => b.slug === m[1]);
        if (!item) throw new Error(`Mock not found: business ${m[1]}`);
        return item as T;
      },
    },
    {
      regex: /^\/offices\/(.+)$/,
      resolve: async (m) => {
        const all = await import("@/mocks/offices.json");
        const data = (all.default ?? all) as { data: Array<{ slug: string }> };
        const item = data.data.find((o) => o.slug === m[1]);
        if (!item) throw new Error(`Mock not found: office ${m[1]}`);
        return item as T;
      },
    },
    {
      regex: /^\/classifieds\/(.+)$/,
      resolve: async (m) => {
        const all = await import("@/mocks/classifieds.json");
        const data = (all.default ?? all) as { data: Array<{ id: string }> };
        const item = data.data.find((c) => c.id === m[1]);
        if (!item) throw new Error(`Mock not found: classified ${m[1]}`);
        return item as T;
      },
    },
    {
      regex: /^\/news\/(.+)$/,
      resolve: async (m) => {
        const all = await import("@/mocks/news.json");
        const data = (all.default ?? all) as { data: Array<{ id: string }> };
        const item = data.data.find((n) => n.id === m[1]);
        if (!item) throw new Error(`Mock not found: news ${m[1]}`);
        return item as T;
      },
    },
  ];

  for (const { regex, resolve } of detailPatterns) {
    const match = path.match(regex);
    if (match) {
      try {
        return await resolve(match);
      } catch {
        throw new Error(`Mock not found for path: ${path}`);
      }
    }
  }

  // Handle list endpoints
  const loader = mockMap[path];
  if (!loader) {
    throw new Error(`No mock found for path: ${path}`);
  }

  const mod = await loader();
  const data = (mod as { default?: unknown }).default ?? mod;

  // Apply basic filtering for list endpoints
  if (params && typeof data === "object" && data !== null && "data" in data) {
    let items = (data as { data: unknown[] }).data;

    if (params.type) {
      items = items.filter(
        (item) => typeof item === "object" && item !== null && "type" in item && (item as { type: string }).type === params.type
      );
    }

    if (params.q) {
      const q = params.q.toLowerCase();
      items = items.filter((item) => {
        if (typeof item !== "object" || item === null) return false;
        // Search across name, title, and tags
        if ("name" in item && (item as { name: string }).name.toLowerCase().includes(q)) return true;
        if ("title" in item && (item as { title: string }).title.toLowerCase().includes(q)) return true;
        if ("tags" in item && Array.isArray((item as { tags: string[] }).tags)) {
          return (item as { tags: string[] }).tags.some((tag) => tag.toLowerCase().includes(q));
        }
        return false;
      });
    }

    if (params.category) {
      items = items.filter(
        (item) => typeof item === "object" && item !== null && "category" in item && (item as { category: string }).category === params.category
      );
    }

    if (params.ad_type) {
      items = items.filter(
        (item) => typeof item === "object" && item !== null && "ad_type" in item && (item as { ad_type: string }).ad_type === params.ad_type
      );
    }

    if (params.open_today === "true") {
      items = items.filter(
        (item) => typeof item === "object" && item !== null && "open_today" in item && (item as { open_today: boolean }).open_today
      );
    }

    const limit = params.limit ? parseInt(params.limit) : 50;
    const offset = params.offset ? parseInt(params.offset) : 0;
    items = items.slice(offset, offset + limit);

    return { ...data, data: items, total: items.length } as T;
  }

  return data as T;
}
