module.exports = {
  content: ["./public/**/*.{html,js}", "./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        primary: withOpacityValue("--color-primary"),
        "primary-accent": withOpacityValue("--color-primary-accent"),
        "primary-muted": withOpacityValue("--color-primary-muted"),
        neutral: withOpacityValue("--color-text-neutral"),
        muted: withOpacityValue("--color-text-muted"),
        foreground: withOpacityValue("--color-foreground"),
        background: withOpacityValue("--color-background"),
        success: withOpacityValue("--color-success"),
        danger: withOpacityValue("--color-danger"),
        warning: withOpacityValue("--color-warning"),
      },
    },
    plugins: [],
  },
};

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}
