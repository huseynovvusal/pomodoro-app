import * as Localization from "expo-localization"

import { I18n } from "i18n-js"
import translations from "./translations.json"

const locale = Localization.locale

const i18next = new I18n(translations)
i18next.locale = locale in translations ? locale : "en-US"

export default i18next
