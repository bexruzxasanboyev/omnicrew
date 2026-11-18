import { useEffect, useMemo, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { useI18n } from "../i18n";
import { phoneCountries, phoneFormats, type PhoneCountry } from "../phoneCountries";

function countryName(country: PhoneCountry, lang: string) {
  const chars = [...country.flag];
  const iso = chars
    .slice(0, 2)
    .map((char) => String.fromCharCode((char.codePointAt(0) ?? 0) - 0x1f1e6 + 65))
    .join("");
  try {
    return new Intl.DisplayNames([lang], { type: "region" }).of(iso) || country.name;
  } catch {
    return country.name;
  }
}

const fallback = phoneCountries[0];

function formatFor(code: string) {
  const format = phoneFormats[code] ?? phoneFormats["+998"];
  const { groups } = format;
  return {
    placeholder: format.placeholder,
    pattern: new RegExp("^" + groups.map((g) => `\\d{${g}}`).join("\\s") + "$"),
    format(digits: string) {
      const parts: string[] = [];
      let i = 0;
      for (const g of groups) {
        if (i >= digits.length) break;
        parts.push(digits.slice(i, i + g));
        i += g;
      }
      return parts.join(" ");
    },
  };
}

// "+998..." kabi to‘liq raqam yopishtirilsa, kodni ajratib oladi
function detectCode(raw: string) {
  if (!raw.startsWith("+")) return null;
  const codes = Object.keys(phoneFormats).sort((a, b) => b.length - a.length);
  return codes.find((code) => raw.startsWith(code)) ?? null;
}

export function PhoneInput({ name }: { name: string }) {
  const { lang, t } = useI18n();
  const names = useMemo(
    () => new Map(phoneCountries.map((country) => [country.flag + country.name, countryName(country, lang)])),
    [lang],
  );
  const [country, setCountry] = useState<PhoneCountry>(fallback);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fmt = formatFor(country.code);
  const complete = fmt.pattern.test(value);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  function onInput(raw: string) {
    const trimmed = raw.trim();
    const code = detectCode(trimmed);
    let active = country;
    let rest = trimmed;
    if (code) {
      if (code !== country.code) {
        active = phoneCountries.find((c) => c.code === code) ?? country;
        setCountry(active);
      }
      rest = trimmed.slice(code.length);
    }
    setValue(formatFor(active.code).format(rest.replace(/\D/g, "")));
  }

  function pick(next: PhoneCountry) {
    setCountry(next);
    setValue("");
    setOpen(false);
    inputRef.current?.focus();
  }

  return (
    <div ref={rootRef} className="relative min-w-0">
      <div className="flex h-12 items-stretch overflow-hidden rounded-xl border border-line bg-white ring-cobalt/30 focus-within:ring-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={t.phone.country}
          className="flex shrink-0 items-center gap-1.5 border-r border-line px-3 text-[18px] text-ink"
        >
          <span aria-hidden="true">{country.flag}</span>
          <span>{country.code}</span>
          <CaretDown size={14} className={`text-muted transition ${open ? "rotate-180" : ""}`} />
        </button>
        <input
          ref={inputRef}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={value}
          placeholder={fmt.placeholder}
          onChange={(e) => onInput(e.target.value)}
          className="w-0 min-w-0 flex-1 bg-transparent px-3 text-[18px] outline-none"
        />
      </div>
      <input type="hidden" name={name} value={complete ? `${country.code} ${value}` : ""} />
      <input type="hidden" name={`${name}Partial`} value={value} />
      {open ? (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-64 overflow-y-auto rounded-xl border border-line bg-white py-1 shadow-[0_16px_40px_rgba(20,24,32,0.14)]"
        >
          {phoneCountries.map((c) => (
            <li key={c.flag + c.name}>
              <button
                type="button"
                role="option"
                aria-selected={c.name === country.name}
                onClick={() => pick(c)}
                className={`flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[15px] hover:bg-fog ${
                  c.name === country.name ? "bg-fog font-medium" : ""
                }`}
              >
                <span className="truncate text-ink">{names.get(c.flag + c.name)}</span>
                <span className="flex shrink-0 items-center gap-2 text-muted">
                  {c.code}
                  <span aria-hidden="true">{c.flag}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
