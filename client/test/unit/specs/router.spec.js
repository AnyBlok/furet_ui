import { getRoutes } from '@/resources';
import { createRouter } from '@/router';

describe('components factory', () => {
  it('createRouter', () => {
    createRouter({}, getRoutes());
  });

  it('push to homepage', () => {
    const router = createRouter({}, getRoutes());
    router.push('homepage');
    expect(router.history.current.path).toBe('/homepage');
  });

  it('push to about (mustBeAuthenticated=True)', () => {
    const router = createRouter({ getters: { loggedIn: true } }, getRoutes());
    router.push('about');
    expect(router.history.current.path).toBe('/about');
  });

  it('push to about (mustBeAuthenticated=false)', () => {
    const router = createRouter({ getters: { loggedIn: false } }, getRoutes());
    router.push('about');
    expect(router.history.current.path).toBe('/login');
  });
});
