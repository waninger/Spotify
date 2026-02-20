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
  const { data: session } = useSession();
  const isAuthed = !!session;

  const email = session?.user?.email ?? "email not found";
  const statusText = isAuthed ? `${email}` : "Not signed in";
  const buttonText = isAuthed ? "Sign out" : "Sign in";
  const onClick = isAuthed ? () => signOut() : () => signIn();

  const containerByVarient: Record<Variant, string> = {
    inline: `${styles.root} ${styles.inline}`,
    card: `${styles.root} ${styles.card}`,
  };
  const buttonByVarient: Record<Variant, string> = {
    inline: `${styles.button} ${styles.ghost}`,
    card: `${styles.button} ${styles.primary}`,
  };
  const statusByVarient: Record<Variant, string> = {
    inline: `${styles.statusInline}`,
    card: `${styles.statusCard}`,
  };

  const containerClass = containerByVarient[variant as Variant];
  const buttonClass = buttonByVarient[variant as Variant];
  const statusClass = statusByVarient[variant as Variant];

  return (
    <div className={containerClass}>
      <p className={statusClass}>{statusText}</p>
      <button className={buttonClass} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}
