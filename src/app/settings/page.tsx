import ThemeSettingsForm from "../../components/features/settings/theme-settings-form/themeSettingsForm";
import { getRequestContext } from "../../utils/requestContext";
import { parseThemeSettingsCookie } from "../../utils/themeSettings";
import styles from "./page.module.scss";

export default async function SettingsPage() {
	const context = await getRequestContext();
	const settings = parseThemeSettingsCookie(context.getCookies()["theme-settings"]);

	return (
		<main className={styles.container}>
			<header className={styles.header}>
				<h1 className={styles.title}>Appearance Settings</h1>
				<p className={styles.subtitle}>
					Customize theme mode, UI scale, and design tokens. Changes are previewed immediately and saved per user cookie.
				</p>
			</header>

			<ThemeSettingsForm initialSettings={settings} />
		</main>
	);
}
