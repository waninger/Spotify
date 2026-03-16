"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import styles from "./loginButton.module.scss";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VARIANTS = ["inline", "card"] as const;
type Variant = (typeof VARIANTS)[number];
type Props = {
  variant?: Variant;
};

export default function LoginButton({ variant = "inline" }: Props) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthed = status === "authenticated";

  const email = session?.user?.email ?? "Not signed in";
  const statusText = isAuthed ? `${email}` : "Not signed in";
  const buttonText = isLoading ? "Loading..." : isAuthed ? "Sign out" : "Sign in";
  const onClick = isAuthed ? () => signOut() : () => signIn();

  const containerByVariant: Record<Variant, string> = {
    inline: `${styles.root} ${styles.inline}`,
    card: `${styles.root} ${styles.card}`,
  };
  const buttonByVariant: Record<Variant, string> = {
    inline: `${styles.button} ${styles.ghost}`,
    card: `${styles.button} ${styles.primary}`,
  };
  const statusByVariant: Record<Variant, string> = {
    inline: `${styles.statusInline}`,
    card: `${styles.statusCard}`,
  };

  const containerClass = containerByVariant[variant as Variant];
  const buttonClass = buttonByVariant[variant as Variant];
  const statusClass = statusByVariant[variant as Variant];

  return (
    <div className={containerClass}>
      <p className={statusClass} title={statusText}>{statusText}</p>
      <button className={buttonClass} onClick={onClick} disabled={isLoading} type="button">
        {buttonText}
      </button>
    </div>
  );
}
