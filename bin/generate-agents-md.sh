#!/bin/bash

# generate-agents-md.sh
# Combines docs/AGENTS.md with filtered guidelines into root AGENTS.md

set -e

# Output file
OUTPUT="AGENTS.md"

# Directories
DOCS_DIR="docs"
GUIDELINES_DIR="content/guidelines"

# Technologies to include
TECHNOLOGIES=("go" "js" "html" "scss" "git")

echo "Generating $OUTPUT..."

# Start with docs/AGENTS.md
if [ -f "$DOCS_DIR/AGENTS.md" ]; then
    cat "$DOCS_DIR/AGENTS.md" > "$OUTPUT"
    echo "" >> "$OUTPUT"
else
    echo "Error: $DOCS_DIR/AGENTS.md not found"
    exit 1
fi

# Add guidelines section
echo "---" >> "$OUTPUT"
echo "" >> "$OUTPUT"
echo "# Developer Guidelines" >> "$OUTPUT"
echo "" >> "$OUTPUT"
echo "The following guidelines apply to this project. They ensure consistency, maintainability, and quality." >> "$OUTPUT"
echo "" >> "$OUTPUT"

# Add main guidelines intro
MAIN_INDEX="$GUIDELINES_DIR/_index.md"
if [ -f "$MAIN_INDEX" ]; then
    echo "## Purpose and Principles" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    # Strip frontmatter and add content
    awk '/^---$/{if(++count==2){flag=1;next}}flag' "$MAIN_INDEX" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
fi

# Process each technology
for tech in "${TECHNOLOGIES[@]}"; do
    tech_dir="$GUIDELINES_DIR/$tech"

    if [ ! -d "$tech_dir" ]; then
        echo "Warning: Directory $tech_dir not found, skipping..."
        continue
    fi

    echo "Processing $tech guidelines..."

    # Add technology section header
    echo "## ${tech^^} Guidelines" >> "$OUTPUT"
    echo "" >> "$OUTPUT"

    # Process _index.md if exists
    if [ -f "$tech_dir/_index.md" ]; then
        awk '/^---$/{if(++count==2){flag=1;next}}flag' "$tech_dir/_index.md" >> "$OUTPUT"
        echo "" >> "$OUTPUT"
    fi

    # Process all other .md files in the directory
    for file in "$tech_dir"/*.md; do
        if [ -f "$file" ] && [ "$(basename "$file")" != "_index.md" ]; then
            filename=$(basename "$file" .md)

            # Add subsection header
            echo "### ${filename^}" >> "$OUTPUT"
            echo "" >> "$OUTPUT"

            # Strip frontmatter and add content
            awk '/^---$/{if(++count==2){flag=1;next}}flag' "$file" >> "$OUTPUT"
            echo "" >> "$OUTPUT"
        fi
    done
done

echo "✓ Generated $OUTPUT successfully!"
echo "  - Combined docs/AGENTS.md with guidelines"
echo "  - Included: ${TECHNOLOGIES[*]}"
