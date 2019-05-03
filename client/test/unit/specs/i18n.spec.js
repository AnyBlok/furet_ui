import { i18n, updateLocales, updateLang } from '@/i18n';
import moment from 'moment';


describe('i18n', () => {
  it('updateLocales', () => {
    i18n.locale = 'ja';
    expect(i18n.t('test.translation')).toBe('test.translation');
    updateLocales([
      {
        locale: 'ja',
        translations: {
          test: {
            translation: 'テスト',
          },
        },
      },
    ]);
    expect(i18n.t('test.translation')).toBe('テスト');
  });
  it('updateLang', () => {
    const date = new Date('2019-01-31T18:41:00');
    i18n.locale = 'fr';
    moment.locale('fr');
    expect(i18n.locale).toBe('fr');
    expect(moment.locale()).toBe('fr');
    expect(moment(date).format('LLL')).toBe('31 janvier 2019 18:41');
    updateLang('ja');
    expect(i18n.locale).toBe('ja');
    expect(moment.locale()).toBe('ja');
    expect(moment(date).format('LLL')).toBe('2019年1月31日 18:41');
  });
});
