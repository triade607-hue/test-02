// ============================================================
// MARKDOWN RENDERER - Rendu simplifié du contenu Markdown
// Fichier: src/lib/utils/render-markdown.tsx
// ============================================================

import React from "react";

/**
 * Parse le texte pour détecter et rendre le texte en gras (**text**)
 */
function parseInlineFormatting(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Ajouter le texte avant le match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    // Ajouter le texte en gras
    parts.push(
      <strong key={match.index} className="font-semibold text-neutral-900">
        {match[1]}
      </strong>
    );
    lastIndex = regex.lastIndex;
  }

  // Ajouter le reste du texte
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

/**
 * Rendre le contenu Markdown simplifié en éléments React
 *
 * Supporte:
 * - ## Titre (h2)
 * - ### Sous-titre (h3)
 * - **texte en gras**
 * - Paragraphes séparés par des lignes vides
 *
 * @param content - Contenu Markdown à rendre
 * @returns Éléments React
 */
export function renderMarkdownContent(content: string): React.ReactNode {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let elementIndex = 0;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join(" ");
      elements.push(
        <p
          key={`p-${elementIndex++}`}
          className="text-neutral-700 leading-relaxed mb-6"
        >
          {parseInlineFormatting(paragraphText)}
        </p>
      );
      currentParagraph = [];
    }
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    // Titre H2 (## )
    if (trimmedLine.startsWith("## ")) {
      flushParagraph();
      const title = trimmedLine.slice(3);
      elements.push(
        <h2
          key={`h2-${elementIndex++}`}
          className="text-xl md:text-2xl font-bold text-neutral-900 mt-10 mb-4"
        >
          {parseInlineFormatting(title)}
        </h2>
      );
    }
    // Titre H3 (### )
    else if (trimmedLine.startsWith("### ")) {
      flushParagraph();
      const title = trimmedLine.slice(4);
      elements.push(
        <h3
          key={`h3-${elementIndex++}`}
          className="text-lg md:text-xl font-semibold text-neutral-800 mt-8 mb-3"
        >
          {parseInlineFormatting(title)}
        </h3>
      );
    }
    // Ligne vide - fin de paragraphe
    else if (trimmedLine === "") {
      flushParagraph();
    }
    // Contenu normal - ajouter au paragraphe courant
    else {
      currentParagraph.push(trimmedLine);
    }
  });

  // Ne pas oublier le dernier paragraphe
  flushParagraph();

  return elements;
}

export default renderMarkdownContent;