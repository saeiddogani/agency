"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { servicesNeededOptions, budgetOptions, timelineOptions } from "@/lib/data";
import { templateFilterCategories } from "@/lib/templates";
import { siteConfig } from "@/lib/site-config";
import { submitInquiry, EMAIL_PATTERN, type InquiryPayload } from "@/lib/inquiry";
import { trackEvent } from "@/lib/analytics";

const businessTypeOptions = templateFilterCategories.filter((category) => category !== "All");

const initialValues: InquiryPayload = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  website: "",
  businessType: "",
  servicesNeeded: [],
  budget: "",
  timeline: "",
  message: "",
  companyWebsite: "",
};

type FormErrors = Partial<Record<keyof InquiryPayload, string>>;

function validate(values: InquiryPayload): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.businessName.trim()) errors.businessName = "Please enter your business name.";

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.businessType) errors.businessType = "Please select your business type.";
  if (values.servicesNeeded.length === 0) errors.servicesNeeded = "Please select at least one service.";

  if (!values.message.trim()) {
    errors.message = "Please tell us a little about your project.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please add a few more details (at least 10 characters).";
  }

  return errors;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [values, setValues] = useState<InquiryPayload>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formBaseId = useId();

  function updateField<K extends keyof InquiryPayload>(field: K, value: InquiryPayload[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function toggleService(service: string) {
    setValues((prev) => ({
      ...prev,
      servicesNeeded: prev.servicesNeeded.includes(service)
        ? prev.servicesNeeded.filter((item) => item !== service)
        : [...prev.servicesNeeded, service],
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Move focus to the first invalid field for keyboard/screen reader users.
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = document.getElementById(`${formBaseId}-${firstErrorField}`);
      el?.focus();
      return;
    }

    setStatus("submitting");
    setSubmitError("");

    const result = await submitInquiry(values);

    if (result.ok) {
      setIsDemoMode(result.demo);
      setStatus("success");
      // Track the conversion itself — deliberately no name/email/message,
      // just non-identifying context about the inquiry.
      trackEvent("contact_form_submit", {
        business_type: values.businessType,
        budget: values.budget || "not_specified",
        timeline: values.timeline || "not_specified",
      });
    } else {
      setSubmitError(result.error);
      setStatus("error");
    }
  }

  function handleRetry() {
    setStatus("idle");
    setSubmitError("");
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-lg border border-ink-200 bg-surface-alt p-8">
        <h2 className="text-xl">Thanks! We&apos;ve received your project details.</h2>
        <p className="text-sm text-ink-500">
          We&apos;ll review what you&apos;ve shared and get back to you shortly to schedule a short
          conversation.
        </p>
        {isDemoMode ? (
          <div className="mt-2 rounded-md border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Demo mode</p>
            <p className="mt-1 text-sm text-amber-900">
              This site isn&apos;t connected to a live email service yet, so nothing was actually sent. If
              your project is time-sensitive, please email us directly at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="underline underline-offset-2">
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-md border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100";
  const errorClasses = "border-red-500 focus:border-red-500 focus:ring-red-100";
  const labelClasses = "text-sm font-medium text-ink-900";

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/*
        Honeypot field — invisible and unreachable for real visitors
        (off-screen, not display:none, and pulled out of tab order), but a
        simple bot that fills in every input will populate it. Left blank
        by everyone else. Server-side check lives in api/contact/route.ts.
      */}
      <div
        className="absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0"
        style={{ clip: "rect(0,0,0,0)" }}
        aria-hidden="true"
      >
        <label htmlFor={`${formBaseId}-companyWebsite`}>Leave this field blank</label>
        <input
          id={`${formBaseId}-companyWebsite`}
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(e) => updateField("companyWebsite", e.target.value)}
        />
      </div>

      {status === "error" ? (
        <div role="alert" className="flex flex-col gap-2 rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">We couldn&apos;t submit your inquiry</p>
          <p className="text-sm text-red-700">{submitError}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="w-fit text-sm font-medium text-red-800 underline underline-offset-2 hover:text-red-900"
          >
            Try again
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formBaseId}-name`} className={labelClasses}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${formBaseId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formBaseId}-name-error` : undefined}
            className={`${inputClasses} ${errors.name ? errorClasses : ""}`}
          />
          {errors.name ? (
            <p id={`${formBaseId}-name-error`} className="text-xs text-red-600">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formBaseId}-businessName`} className={labelClasses}>
            Business Name <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${formBaseId}-businessName`}
            name="businessName"
            type="text"
            autoComplete="organization"
            value={values.businessName}
            onChange={(e) => updateField("businessName", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.businessName)}
            aria-describedby={errors.businessName ? `${formBaseId}-businessName-error` : undefined}
            className={`${inputClasses} ${errors.businessName ? errorClasses : ""}`}
          />
          {errors.businessName ? (
            <p id={`${formBaseId}-businessName-error`} className="text-xs text-red-600">
              {errors.businessName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formBaseId}-email`} className={labelClasses}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${formBaseId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formBaseId}-email-error` : undefined}
            className={`${inputClasses} ${errors.email ? errorClasses : ""}`}
          />
          {errors.email ? (
            <p id={`${formBaseId}-email-error`} className="text-xs text-red-600">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formBaseId}-phone`} className={labelClasses}>
            Phone <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <input
            id={`${formBaseId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor={`${formBaseId}-website`} className={labelClasses}>
            Current Website <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <input
            id={`${formBaseId}-website`}
            name="website"
            type="url"
            autoComplete="url"
            placeholder="https://"
            value={values.website}
            onChange={(e) => updateField("website", e.target.value)}
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formBaseId}-businessType`} className={labelClasses}>
            Business Type <span aria-hidden="true">*</span>
          </label>
          <select
            id={`${formBaseId}-businessType`}
            name="businessType"
            value={values.businessType}
            onChange={(e) => updateField("businessType", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.businessType)}
            aria-describedby={errors.businessType ? `${formBaseId}-businessType-error` : undefined}
            className={`${inputClasses} ${errors.businessType ? errorClasses : ""}`}
          >
            <option value="" disabled>
              Select an option
            </option>
            {businessTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.businessType ? (
            <p id={`${formBaseId}-businessType-error`} className="text-xs text-red-600">
              {errors.businessType}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formBaseId}-budget`} className={labelClasses}>
            Approximate Budget <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <select
            id={`${formBaseId}-budget`}
            name="budget"
            value={values.budget}
            onChange={(e) => updateField("budget", e.target.value)}
            className={inputClasses}
          >
            <option value="">Select a range</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <fieldset
          className="flex flex-col gap-2 sm:col-span-2"
          aria-describedby={errors.servicesNeeded ? `${formBaseId}-servicesNeeded-error` : undefined}
        >
          <legend className={labelClasses}>
            Services Needed <span aria-hidden="true">*</span>
          </legend>
          <div id={`${formBaseId}-servicesNeeded`} className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {servicesNeededOptions.map((service) => {
              const checkboxId = `${formBaseId}-service-${service.replace(/\s+/g, "-").toLowerCase()}`;
              return (
                <label
                  key={service}
                  htmlFor={checkboxId}
                  className="flex items-center gap-2.5 rounded-md border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-700 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50"
                >
                  <input
                    id={checkboxId}
                    type="checkbox"
                    checked={values.servicesNeeded.includes(service)}
                    onChange={() => toggleService(service)}
                    className="h-4 w-4 shrink-0 rounded border-ink-300 text-brand-600"
                  />
                  {service}
                </label>
              );
            })}
          </div>
          {errors.servicesNeeded ? (
            <p id={`${formBaseId}-servicesNeeded-error`} className="text-xs text-red-600">
              {errors.servicesNeeded}
            </p>
          ) : null}
        </fieldset>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formBaseId}-timeline`} className={labelClasses}>
            Desired Timeline <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <select
            id={`${formBaseId}-timeline`}
            name="timeline"
            value={values.timeline}
            onChange={(e) => updateField("timeline", e.target.value)}
            className={inputClasses}
          >
            <option value="">Select a timeline</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor={`${formBaseId}-message`} className={labelClasses}>
            Tell Us About Your Project <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={`${formBaseId}-message`}
            name="message"
            rows={5}
            value={values.message}
            onChange={(e) => updateField("message", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${formBaseId}-message-error` : undefined}
            className={`${inputClasses} resize-y ${errors.message ? errorClasses : ""}`}
          />
          {errors.message ? (
            <p id={`${formBaseId}-message-error`} className="text-xs text-red-600">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-fit">
        {status === "submitting" ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
}
