const jitterAnimation = {
  animation: "jitter 0.3s ease-in-out",
  "@keyframes jitter": {
    "0%, 100%": { transform: "translateX(0)" },
    "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-4px)" },
    "20%, 40%, 60%, 80%": { transform: "translateX(4px)" },
  },
}

export { jitterAnimation }
