import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n.use(initReactI18next)
	.use(LanguageDetector)
	.use(HttpApi)
	.init({
		// the translations
		// (tip move them in a JSON file and import them,
		// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
		supportedLngs: ['en', 'tn'],
		fallbackLng: 'en',
		detection: {
			order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
			caches: ['cookie', 'localStorage']
		},
		backend: {
			loadPath: 'assets/languages/{{lng}}/translation.json'
		},
		react: {
			useSuspense: true
		}
	});

export default i18n;

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// // the translations
// // (tip move them in a JSON file and import them)
// const resources = {
// 	en: {
// 		translation: {
// 			'Welcome to React': 'Welcome to React and react-i18next'
// 		}
// 	}
// };

// i18n.use(initReactI18next) // passes i18n down to react-i18next
// 	.init({
// 		resources,
// 		lng: 'en',

// 		keySeparator: false, // we do not use keys in form messages.welcome

// 		interpolation: {
// 			escapeValue: false // react already safes from xss
// 		}
// 	});

// export default i18n;
