**ACT AS:**
A world-class Creative Developer (Awwwards-level) specializing in react, Framer Motion, and scroll-based animations.

**THE TASK:**
Build a high-end "Scrollytelling" landing page for a pendant that has 3 elements, a stainless steel base, a round image in the middle and a curved glass on top .

The core mechanic is a scroll-linked animation that plays an image sequence of the pendant assembling its components as the user scrolls down.

**TECH STACK:**
- Framework: React on Vite
- Styling: Tailwind CSS
- Animation: Framer Motion
- Rendering: HTML5 Canvas (for performance)

**VISUAL DIRECTION & COLOR:**
- **Seamless Blending:** The background of the website MUST match the background color of the image sequence exactly so the image edges are invisible. Use an eyedropper on the images to get the exact hex.
- **Color Palette:** Clear Mode as the background of the images is #EDE0C4, and the Background gradient: `135deg → #FAF8F0 → #F5EDD8 → #EDE0C4`

- **Typography:** Britney and Quick sand check public/fonts for variations

**IMPLEMENTATION DETAILS:**

1. **The "Sticky" Canvas:**
   - Create a component called `PendantScroll.tsx`
   - It should have a container with `h-[400vh]` (4x viewport height) to allow for a long scroll duration
   - Inside, place a `<canvas>` element that is `sticky`, `top-0`, `h-screen`, and `w-full`
   - Canvas must be centered perfectly

2. **The Scroll Logic:**
   - Load a sequence of images from `public/images`. Naming convention: `ezfig-farme-[i].jpg`
   - Check the actual filenames in my sequence folder and match them exactly
   - Use `useScroll` from Framer Motion to map the user's scroll progress (0 to 1) to the image frame index (0 to total frames)
   - Draw the current frame to the canvas on every scroll tick
   - Ensure smooth interpolation so it doesn't stutter

3. **Text Overlays (The Story):**
   - Overlay text sections that fade in/out as the pendant assembles
   - **0% Scroll:** "Personalize it as you imagine" (Centered Title, large)
   - **30% Scroll:** "Every piece begins with your idea." (Left aligned)
   - **60% Scroll:** "Handcrafted in steel and resin, shaped to your story." (Right aligned)
   - **90% Scroll:** "Wear something made only for you." (Centered CTA with button)

4. **Loading State:**
   - Add a loading spinner/state while images pre-load to prevent flickering
   - Only show the scroll animation once all frames are loaded

5. **Responsiveness:**
   - Ensure the canvas scales correctly on mobile (contain fit)
   - Text should be readable on all screen sizes
   - Test for 320px to 1440px viewports

6. **Polish:**
   - Smooth easing on text fade in/out
   - Subtle blur or glow effect on text for premium feel
   - No janky scroll behavior

**OUTPUT:**
Generate the full code for:
- `DesignPage.tsx`
- `components/PendantScroll.tsx`
- `index.css` (any additional styles needed)

Make sure to handle edge cases like:
- Images not loading
- Different frame counts (count the actual files)
- Mobile scroll behavior
