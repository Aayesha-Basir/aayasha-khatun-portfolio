import fs from "fs";
import path from "path";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";

import {
  profile,
  experience,
  education,
  skillGroups,
  interests,
  socials,
  languages as dataLanguages,
} from "@/lib/data";

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;

const SIDEBAR_WIDTH = 175;
const CONTENT_X = 205;
const CONTENT_WIDTH = PAGE_WIDTH - CONTENT_X - 42;

const COLORS = {
  sidebar: rgb(0.075, 0.075, 0.075),
  sidebarText: rgb(0.92, 0.92, 0.92),
  sidebarMuted: rgb(0.68, 0.68, 0.68),

  text: rgb(0.1, 0.1, 0.1),
  muted: rgb(0.38, 0.38, 0.38),

  accent: rgb(0.48, 0.18, 0.25),
  accentSoft: rgb(0.93, 0.88, 0.89),

  line: rgb(0.87, 0.87, 0.87),
  white: rgb(1, 1, 1),
};

export async function GET() {
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // =========================================================
  // BACKGROUND
  // =========================================================

  page.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    color: COLORS.white,
  });

  // Sidebar
  page.drawRectangle({
    x: 0,
    y: 0,
    width: SIDEBAR_WIDTH,
    height: PAGE_HEIGHT,
    color: COLORS.sidebar,
  });

  // Small accent strip
  page.drawRectangle({
    x: SIDEBAR_WIDTH,
    y: 0,
    width: 4,
    height: PAGE_HEIGHT,
    color: COLORS.accent,
  });

  // =========================================================
  // SIDEBAR
  // =========================================================

  let sideY = PAGE_HEIGHT - 42;

  // ---------------------------------------------------------
  // PHOTO
  // ---------------------------------------------------------

  try {
    const imagePath = path.join(
      process.cwd(),
      "public",
      "images",
      "aayasha.jpg",
    );

    if (fs.existsSync(imagePath)) {
      const imageBytes = fs.readFileSync(imagePath);
      const image = await pdfDoc.embedJpg(imageBytes);

      const photoW = 108;
      const photoH = 132;

      const photoX = (SIDEBAR_WIDTH - photoW) / 2;
      const photoY = sideY - photoH;

      // Subtle frame
      page.drawRectangle({
        x: photoX - 4,
        y: photoY - 4,
        width: photoW + 8,
        height: photoH + 8,
        color: rgb(0.12, 0.12, 0.12),
        borderColor: rgb(0.28, 0.28, 0.28),
        borderWidth: 1,
      });

      page.drawImage(image, {
        x: photoX,
        y: photoY,
        width: photoW,
        height: photoH,
      });

      sideY = photoY - 34;
    }
  } catch {
    // Keep the rest of the resume working if the image is unavailable.
  }

  // ---------------------------------------------------------
  // CONTACT
  // ---------------------------------------------------------

  drawSidebarHeading(page, "CONTACT", 22, sideY, bold);
  sideY -= 18;

  for (const social of socials) {
    let value = "";

    if (social.kind === "email") {
      value = social.handle;
    } else {
      value = social.href.replace(/^https?:\/\//, "");
    }

    sideY = drawSidebarItem(
      page,
      social.label,
      value,
      22,
      sideY,
      regular,
      bold,
    );

    if (sideY < 100) break;
  }

  if (profile.address) {
    sideY -= 3;

    sideY = drawSidebarItem(
      page,
      "Location",
      String(profile.address),
      22,
      sideY,
      regular,
      bold,
    );
  }

  if (profile.phone) {
    sideY = drawSidebarItem(
      page,
      "Phone",
      String(profile.phone),
      22,
      sideY,
      regular,
      bold,
    );
  }

  // ---------------------------------------------------------
  // SKILLS
  // ---------------------------------------------------------

  sideY -= 12;

  drawSidebarHeading(page, "SKILLS", 22, sideY, bold);
  sideY -= 20;

  for (const group of skillGroups) {
    if (sideY < 120) break;

    page.drawText(group.title, {
      x: 22,
      y: sideY,
      size: 8.5,
      font: bold,
      color: COLORS.sidebarText,
    });

    sideY -= 13;

    for (const skill of group.items.slice(0, 5)) {
      page.drawCircle({
        x: 25,
        y: sideY + 3,
        size: 1.5,
        color: COLORS.accent,
      });

      page.drawText(String(skill), {
        x: 31,
        y: sideY,
        size: 8.2,
        font: regular,
        color: COLORS.sidebarMuted,
      });

      sideY -= 11;
    }

    sideY -= 8;
  }

  // ---------------------------------------------------------
  // LANGUAGES
  // ---------------------------------------------------------

  const langList =
    profile.languages && profile.languages.length
      ? profile.languages
      : dataLanguages && dataLanguages.length
        ? dataLanguages
        : ["English"];

  if (sideY > 90) {
    drawSidebarHeading(page, "LANGUAGES", 22, sideY, bold);
    sideY -= 18;

    for (const language of langList) {
      page.drawText(String(language), {
        x: 22,
        y: sideY,
        size: 8.5,
        font: regular,
        color: COLORS.sidebarMuted,
      });

      sideY -= 12;
    }
  }

  // =========================================================
  // MAIN CONTENT
  // =========================================================

  let y = PAGE_HEIGHT - 52;

  // ---------------------------------------------------------
  // NAME
  // ---------------------------------------------------------

  page.drawText(profile.name, {
    x: CONTENT_X,
    y,
    size: 27,
    font: bold,
    color: COLORS.text,
  });

  y -= 22;

  page.drawText(profile.title.toUpperCase(), {
    x: CONTENT_X,
    y,
    size: 9,
    font: bold,
    color: COLORS.accent,
    characterSpacing: 1.2,
  });

  y -= 20;

  page.drawLine({
    start: {
      x: CONTENT_X,
      y,
    },
    end: {
      x: PAGE_WIDTH - 42,
      y,
    },
    thickness: 1,
    color: COLORS.line,
  });

  y -= 22;

  // ---------------------------------------------------------
  // PROFILE
  // ---------------------------------------------------------

  y = drawSectionTitle(page, "PROFILE", y, bold);

  const summaryLines = wrapText(
    profile.summary || "",
    regular,
    10.2,
    CONTENT_WIDTH,
  );

  for (const line of summaryLines) {
    page.drawText(line, {
      x: CONTENT_X,
      y,
      size: 10.2,
      font: regular,
      color: COLORS.muted,
    });

    y -= 14;
  }

  y -= 10;

  // ---------------------------------------------------------
  // EXPERIENCE
  // ---------------------------------------------------------

  y = drawSectionTitle(page, "EXPERIENCE", y, bold);

  for (const item of experience) {
    if (y < 270) break;

    // Role
    page.drawText(item.role, {
      x: CONTENT_X,
      y,
      size: 11,
      font: bold,
      color: COLORS.text,
    });

    // Period aligned right
    const periodWidth = regular.widthOfTextAtSize(item.period, 8.5);

    page.drawText(item.period, {
      x: PAGE_WIDTH - 42 - periodWidth,
      y: y + 1,
      size: 8.5,
      font: regular,
      color: COLORS.muted,
    });

    y -= 14;

    // Organization
    page.drawText(item.org, {
      x: CONTENT_X,
      y,
      size: 9,
      font: bold,
      color: COLORS.accent,
    });

    y -= 14;

    const highlights =
      // @ts-ignore
      item.highlights?.length
        ? // @ts-ignore
          item.highlights
        : [item.description];

    for (const highlight of highlights.slice(0, 3)) {
      const lines = wrapText(
        String(highlight),
        regular,
        9.1,
        CONTENT_WIDTH - 12,
      );

      for (let i = 0; i < lines.length; i++) {
        page.drawCircle({
          x: CONTENT_X + 3,
          y: y + 3,
          size: 1.3,
          color: COLORS.accent,
        });

        page.drawText(lines[i], {
          x: CONTENT_X + 10,
          y,
          size: 9.1,
          font: regular,
          color: COLORS.muted,
        });

        y -= 12;
      }
    }

    y -= 9;
  }

  // ---------------------------------------------------------
  // EDUCATION
  // ---------------------------------------------------------

  y = drawSectionTitle(page, "EDUCATION", y, bold);

  for (const item of education) {
    page.drawText(item.degree, {
      x: CONTENT_X,
      y,
      size: 10.5,
      font: bold,
      color: COLORS.text,
    });

    const periodWidth = regular.widthOfTextAtSize(item.period, 8.5);

    page.drawText(item.period, {
      x: PAGE_WIDTH - 42 - periodWidth,
      y: y + 1,
      size: 8.5,
      font: regular,
      color: COLORS.muted,
    });

    y -= 14;

    page.drawText(item.school, {
      x: CONTENT_X,
      y,
      size: 9,
      font: regular,
      color: COLORS.muted,
    });

    y -= 21;

    // If GPA is included in notes (e.g., "GPA: 3.52"), display it prominently
    let extraSpace = 30;
    if (item.notes && item.notes.length) {
      const gpaNoteIndex = item.notes.findIndex((n) =>
        String(n).toUpperCase().startsWith("GPA"),
      );
      if (gpaNoteIndex !== -1) {
        const gpa = item.notes[gpaNoteIndex];
        page.drawText(String(gpa), {
          x: CONTENT_X,
          y: y - 28,
          size: 10,
          font: regular,
        });
        // remove the GPA note from the list we will render as bullets
        const otherNotes = item.notes.filter((_, i) => i !== gpaNoteIndex);
        let noteY = y - 44;
        otherNotes.slice(0, 3).forEach((n) => {
          const lines = wrapText(String(n), regular, 9, CONTENT_WIDTH - 12);
          lines.forEach((ln) => {
            page.drawText(`• ${ln}`, {
              x: CONTENT_X + 6,
              y: noteY,
              size: 9,
              font: regular,
            });
            noteY -= 14;
          });
        });
        extraSpace = y - noteY + 10;
      } else {
        // no GPA, just render up to 3 notes as bullets
        let noteY = y - 16;
        item.notes.slice(0, 3).forEach((n) => {
          const lines = wrapText(String(n), regular, 9, CONTENT_WIDTH - 12);
          lines.forEach((ln) => {
            page.drawText(`• ${ln}`, {
              x: CONTENT_X + 6,
              y: noteY,
              size: 9,
              font: regular,
            });
            noteY -= 14;
          });
        });
        extraSpace = y - noteY + 6;
      }
    }

    y -= Math.max(30, extraSpace);
  }

  // ---------------------------------------------------------
  // PERSONAL / INTERESTS
  // ---------------------------------------------------------

  if (interests?.length && y > 80) {
    y = drawSectionTitle(page, "BEYOND WORK", y, bold);

    const interestText = interests.slice(0, 6).join("  •  ");

    const interestLines = wrapText(interestText, regular, 9.2, CONTENT_WIDTH);

    for (const line of interestLines) {
      page.drawText(line, {
        x: CONTENT_X,
        y,
        size: 9.2,
        font: regular,
        color: COLORS.muted,
      });

      y -= 13;
    }
  }

  // =========================================================
  // FOOTER
  // =========================================================

  page.drawLine({
    start: {
      x: CONTENT_X,
      y: 34,
    },
    end: {
      x: PAGE_WIDTH - 42,
      y: 34,
    },
    thickness: 0.6,
    color: COLORS.line,
  });

  page.drawText("Aayasha Khatun", {
    x: CONTENT_X,
    y: 20,
    size: 7.5,
    font: bold,
    color: COLORS.muted,
  });

  page.drawText("Frontend Developer", {
    x: PAGE_WIDTH - 42 - regular.widthOfTextAtSize("Frontend Developer", 7.5),
    y: 20,
    size: 7.5,
    font: regular,
    color: COLORS.muted,
  });

  // =========================================================
  // RESPONSE
  // =========================================================

  const pdfBytes = await pdfDoc.save();

  return new Response(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="aayasha-khatun-resume.pdf"',
    },
  });
}

// =============================================================
// HELPERS
// =============================================================

function drawSidebarHeading(
  page: PDFPage,
  title: string,
  x: number,
  y: number,
  bold: PDFFont,
) {
  page.drawText(title, {
    x,
    y,
    size: 8.5,
    font: bold,
    color: COLORS.sidebarText,
    characterSpacing: 1,
  });

  page.drawRectangle({
    x,
    y: y - 5,
    width: 26,
    height: 1.5,
    color: COLORS.accent,
  });
}

function drawSidebarItem(
  page: PDFPage,
  label: string,
  value: string,
  x: number,
  y: number,
  regular: PDFFont,
  bold: PDFFont,
) {
  page.drawText(label, {
    x,
    y,
    size: 7.2,
    font: bold,
    color: COLORS.sidebarText,
  });

  y -= 10;

  const lines = wrapText(value, regular, 7.7, SIDEBAR_WIDTH - x - 18);

  for (const line of lines.slice(0, 3)) {
    page.drawText(line, {
      x,
      y,
      size: 7.7,
      font: regular,
      color: COLORS.sidebarMuted,
    });

    y -= 10;
  }

  return y - 6;
}

function drawSectionTitle(
  page: PDFPage,
  title: string,
  y: number,
  bold: PDFFont,
) {
  page.drawText(title, {
    x: CONTENT_X,
    y,
    size: 8.5,
    font: bold,
    color: COLORS.accent,
    characterSpacing: 1.3,
  });

  page.drawLine({
    start: {
      x: CONTENT_X + 58,
      y: y + 2,
    },
    end: {
      x: PAGE_WIDTH - 42,
      y: y + 2,
    },
    thickness: 0.7,
    color: COLORS.line,
  });

  return y - 18;
}

function wrapText(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number,
) {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];

  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;

    if (font.widthOfTextAtSize(test, fontSize) <= maxWidth) {
      current = test;
    } else {
      if (current) {
        lines.push(current);
      }

      current = word;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}
