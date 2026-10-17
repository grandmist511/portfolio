import { ArrowRight, Home } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import PageTransition from "../../components/motion/PageTransition";
import "./notfound.css";

function avoidPointer(position, index, pointer, width, height) {
  const dx = position.x - pointer.x;
  const dy = position.y - pointer.y;
  const distance = Math.hypot(dx, dy);
  if (distance > 190) return position;

  const angle = distance === 0 ? index * (Math.PI * 2 / 3) : Math.atan2(dy, dx);
  const escapeDistance = 220 + (190 - distance) * 0.45;
  const verticalMargin = Math.min(84, height / 2);

  return {
    ...position,
    x: Math.max(position.width / 2 + 12, Math.min(width - position.width / 2 - 12,
      pointer.x + Math.cos(angle) * escapeDistance)),
    y: Math.max(verticalMargin, Math.min(height - verticalMargin,
      pointer.y + Math.sin(angle) * escapeDistance)),
    rotate: (Math.random() * 2 - 1) * 55,
  };
}

const motionPatterns = ["circle", "figure-eight", "zigzag", "wave", "diamond", "spiral"];
const patternSteps = 9;

function triangleWave(value) {
  const progress = ((value % 1) + 1) % 1;
  return 1 - 4 * Math.abs(progress - 0.5);
}

function createPatternPath(pattern, digitWidths, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const widestDigit = Math.max(...digitWidths);
  const radiusX = Math.max(24, Math.min(width / 2 - widestDigit / 2 - 16, width * 0.42));
  const verticalMargin = Math.min(84, height / 2);
  const radiusY = Math.max(24, Math.min(height / 2 - verticalMargin, height * 0.38));

  return Array.from({ length: patternSteps }, (_, step) => {
    const progress = step / (patternSteps - 1);
    const angle = progress * Math.PI * 2;

    return digitWidths.map((digitWidth, index) => {
      const phase = angle + (index * Math.PI * 2) / 3;
      let x;
      let y;

      switch (pattern) {
        case "circle":
          x = centerX + radiusX * 0.86 * Math.cos(phase);
          y = centerY + radiusY * 0.86 * Math.sin(phase);
          break;
        case "figure-eight":
          x = centerX + radiusX * 0.86 * Math.sin(phase);
          y = centerY + radiusY * 0.86 * Math.sin(phase * 2) * 0.5;
          break;
        case "zigzag":
          x = centerX + radiusX * 0.86 * triangleWave(progress * 2 + index / 3);
          y = centerY + radiusY * 0.86 * triangleWave(progress * 3 + index / 3);
          break;
        case "wave":
          x = centerX + radiusX * 0.86 * Math.sin(phase * 1.5);
          y = centerY + radiusY * 0.86 * Math.sin(phase * 2.5 + index);
          break;
        case "diamond": {
          const divisor = Math.abs(Math.cos(phase)) + Math.abs(Math.sin(phase));
          x = centerX + radiusX * 0.86 * Math.cos(phase) / divisor;
          y = centerY + radiusY * 0.86 * Math.sin(phase) / divisor;
          break;
        }
        default: {
          const radius = 0.18 + progress * 0.68;
          x = centerX + radiusX * radius * Math.cos(phase * 1.4);
          y = centerY + radiusY * radius * Math.sin(phase * 1.4);
        }
      }

      return {
        x: Math.max(digitWidth / 2 + 12, Math.min(width - digitWidth / 2 - 12, x)),
        y: Math.max(verticalMargin, Math.min(height - verticalMargin, y)),
        width: digitWidth,
        rotate: Math.sin(phase) * 28,
        scale: 0.9 + (Math.sin(phase * 2) + 1) * 0.08,
      };
    });
  });
}

function NotFound() {
  const prefersReducedMotion = useReducedMotion();
  const visualRef = useRef(null);
  const restingDigitRefs = useRef([]);
  const restingPositionsRef = useRef(null);
  const digitPositionsRef = useRef(null);
  const isScatteredRef = useRef(false);
  const previousPatternRef = useRef(-1);
  const lastDodgeTimeRef = useRef(0);
  const pointerPositionRef = useRef(null);
  const [restingPositions, setRestingPositions] = useState(null);
  const [digitPositions, setDigitPositions] = useState(null);

  useLayoutEffect(() => {
    function updateRestingPositions() {
      if (!visualRef.current) return;

      const positions = restingDigitRefs.current.map((digit) => {
        const bounds = digit.getBoundingClientRect();
        return {
          x: bounds.left + bounds.width / 2,
          y: bounds.top + bounds.height / 2,
          width: bounds.width,
        };
      });

      restingPositionsRef.current = positions;
      digitPositionsRef.current = positions;
      setRestingPositions(positions);
      setDigitPositions(positions);
    }

    const measureTimer = window.setTimeout(updateRestingPositions, 300);
    window.addEventListener("resize", updateRestingPositions);
    return () => {
      window.clearTimeout(measureTimer);
      window.removeEventListener("resize", updateRestingPositions);
    };
  }, []);

  useEffect(() => {
    if (!restingPositions) return undefined;
    if (prefersReducedMotion) {
      isScatteredRef.current = false;
      digitPositionsRef.current = restingPositions;
      const resetFrame = window.requestAnimationFrame(() => {
        setDigitPositions(restingPositions);
      });
      return () => window.cancelAnimationFrame(resetFrame);
    }

    let timer;
    let cancelled = false;

    function schedule(callback, delay) {
      timer = window.setTimeout(callback, delay);
    }

    function runNextPattern() {
      if (cancelled) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const positions = restingPositionsRef.current;
      if (!positions) return;

      const choices = motionPatterns
        .map((pattern, index) => ({ pattern, index }))
        .filter(({ index }) => index !== previousPatternRef.current);
      const choice = choices[Math.floor(Math.random() * choices.length)];
      previousPatternRef.current = choice.index;
      const path = createPatternPath(
        choice.pattern,
        positions.map((digit) => digit.width),
        width,
        height,
      );

      isScatteredRef.current = true;
      let step = 0;

      function followPath() {
        if (cancelled) return;

        if (step >= path.length) {
          isScatteredRef.current = false;
          digitPositionsRef.current = positions;
          setDigitPositions(positions);
          schedule(runNextPattern, 2300);
          return;
        }

        const waypoint = path[step];
        const nextPositions = pointerPositionRef.current
          ? waypoint.map((position, index) =>
              avoidPointer(position, index, pointerPositionRef.current, width, height))
          : waypoint;
        digitPositionsRef.current = nextPositions;
        setDigitPositions(nextPositions);
        step += 1;
        schedule(followPath, 360);
      }

      followPath();
    }

    schedule(runNextPattern, 1100);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      isScatteredRef.current = false;
    };
  }, [prefersReducedMotion, restingPositions]);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    function dodgePointer(clientX, clientY) {
      pointerPositionRef.current = { x: clientX, y: clientY };
      if (!isScatteredRef.current || !digitPositionsRef.current) return;

      const now = performance.now();
      if (now - lastDodgeTimeRef.current < 90) return;
      lastDodgeTimeRef.current = now;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const pointer = { x: clientX, y: clientY };
      const nextPositions = digitPositionsRef.current.map((digit, index) =>
        avoidPointer(digit, index, pointer, width, height));

      digitPositionsRef.current = nextPositions;
      setDigitPositions(nextPositions);
    }

    function handlePointerMove(event) {
      if (event.pointerType !== "touch") dodgePointer(event.clientX, event.clientY);
    }

    function handleTouchMove(event) {
      const touch = event.touches[0];
      if (touch) dodgePointer(touch.clientX, touch.clientY);
    }

    function handleTouchEnd() {
      pointerPositionRef.current = null;
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [prefersReducedMotion]);

  return (
    <PageTransition>
      <main className="not-found">
        <section className="not-found-card" aria-labelledby="not-found-title">
          <motion.div
            className="not-found-visual"
            ref={visualRef}
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={`not-found-code${digitPositions ? " not-found-code--hidden" : ""}`}>
              {[4, 0, 4].map((digit, index) => (
                <span
                  className="not-found-resting-digit"
                  key={`${digit}-${index}`}
                  ref={(element) => { restingDigitRefs.current[index] = element; }}
                >
                  {digit}
                </span>
              ))}
            </span>
            <span className="not-found-visual-label">PAGE NOT FOUND</span>
          </motion.div>

          <div className="not-found-content">
            <motion.p
              className="not-found-eyebrow"
              initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span />
              Looks like a wrong turn
            </motion.p>
            <motion.h1
              className="not-found-title"
              id="not-found-title"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              This page wandered off the map.
            </motion.h1>
            <motion.p
              className="not-found-desc"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              The link may be outdated, or this page may have moved. Let&apos;s
              get you back to something useful.
            </motion.p>
            <motion.div
              className="not-found-actions"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button asLink href="/">
                <Home size={18} />
                Back to home
              </Button>
              <Button asLink href="/Projects" variant="secondary">
                Explore projects
                <ArrowRight size={18} />
              </Button>
            </motion.div>
          </div>

          <motion.footer
            className="not-found-footer"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.58 }}
          >
            <Link className="not-found-brand" to="/">
              <img src="/images/grandmist-icon.png" alt="" />
              <span>grandmist.tech</span>
            </Link>
            <span>Let&apos;s find your way back.</span>
          </motion.footer>
        </section>
        {digitPositions && (
          <div className="not-found-roaming" aria-hidden="true">
            {digitPositions.map((position, index) => (
              <motion.span
                className="not-found-roaming-digit"
                key={`roaming-${index}`}
                initial={false}
                animate={{
                  x: position.x,
                  y: position.y,
                  rotate: position.rotate ?? 0,
                  scale: position.scale ?? 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 75,
                  damping: 14,
                  mass: 0.9,
                }}
              >
                <span>{[4, 0, 4][index]}</span>
              </motion.span>
            ))}
          </div>
        )}
      </main>
    </PageTransition>
  );
}

export default NotFound;
