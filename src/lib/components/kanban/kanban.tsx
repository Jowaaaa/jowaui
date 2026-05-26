import React, { useState, useRef, useCallback } from "react";

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  assignee?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  cards: KanbanCard[];
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
  onChange?: (columns: KanbanColumn[]) => void;
  className?: string;
}

interface DragState {
  cardId: string;
  fromColumnId: string;
}

export const KanbanBoard = React.forwardRef<HTMLDivElement, KanbanBoardProps>(
  ({ columns: columnsProp, onChange, className }, ref) => {
    const isControlled: boolean = onChange !== undefined;
    const [internalColumns, setInternalColumns] = useState<KanbanColumn[]>(columnsProp);
    const columns: KanbanColumn[] = isControlled ? columnsProp : internalColumns;

    const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);
    const dragState = useRef<DragState | null>(null);

    const updateColumns = useCallback(
      (next: KanbanColumn[]): void => {
        if (isControlled) {
          onChange!(next);
        } else {
          setInternalColumns(next);
        }
      },
      [isControlled, onChange]
    );

    const handleDragStart = useCallback(
      (e: React.DragEvent, cardId: string, fromColumnId: string): void => {
        dragState.current = { cardId, fromColumnId };
        e.dataTransfer.effectAllowed = "move";
        // Small delay so the drag image renders before we add the dragging class
        requestAnimationFrame(() => {
          const el = document.querySelector(`[data-card-id="${cardId}"]`);
          el?.classList.add("jowa-kanban__card--dragging");
        });
      },
      []
    );

    const handleDragEnd = useCallback((): void => {
      dragState.current = null;
      setDragOverColumnId(null);
      document.querySelectorAll(".jowa-kanban__card--dragging").forEach((el) => {
        el.classList.remove("jowa-kanban__card--dragging");
      });
    }, []);

    const handleDragOver = useCallback(
      (e: React.DragEvent, columnId: string): void => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOverColumnId(columnId);
      },
      []
    );

    const handleDragLeave = useCallback((): void => {
      setDragOverColumnId(null);
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent, toColumnId: string): void => {
        e.preventDefault();
        setDragOverColumnId(null);

        const state = dragState.current;
        if (!state) return;
        const { cardId, fromColumnId } = state;
        if (fromColumnId === toColumnId) return;

        const next: KanbanColumn[] = columns.map((col) => {
          if (col.id === fromColumnId) {
            return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
          }
          if (col.id === toColumnId) {
            const card = columns
              .find((c) => c.id === fromColumnId)
              ?.cards.find((c) => c.id === cardId);
            if (!card) return col;
            return { ...col, cards: [...col.cards, card] };
          }
          return col;
        });

        updateColumns(next);
      },
      [columns, updateColumns]
    );

    const boardClasses = ["jowa-kanban", className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={boardClasses} role="region" aria-label="Kanban board">
        {columns.map((col) => {
          const colClasses = [
            "jowa-kanban__column",
            dragOverColumnId === col.id ? "jowa-kanban__column--dragover" : null,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={col.id}
              className={colClasses}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              <div className="jowa-kanban__column-header">
                {col.color && (
                  <span
                    className="jowa-kanban__column-color"
                    style={{ backgroundColor: col.color }}
                    aria-hidden="true"
                  />
                )}
                <span className="jowa-kanban__column-title">{col.title}</span>
                <span className="jowa-kanban__column-count" aria-label={`${col.cards.length} cards`}>
                  {col.cards.length}
                </span>
              </div>
              <div className="jowa-kanban__column-body">
                {col.cards.map((card) => (
                  <div
                    key={card.id}
                    data-card-id={card.id}
                    className="jowa-kanban__card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, card.id, col.id)}
                    onDragEnd={handleDragEnd}
                    role="article"
                    aria-label={card.title}
                    tabIndex={0}
                  >
                    <p className="jowa-kanban__card-title">{card.title}</p>
                    {card.description && (
                      <p className="jowa-kanban__card-description">{card.description}</p>
                    )}
                    {card.tags && card.tags.length > 0 && (
                      <div className="jowa-kanban__card-tags">
                        {card.tags.map((tag) => (
                          <span key={tag} className="jowa-kanban__card-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {card.assignee && (
                      <div className="jowa-kanban__card-assignee" aria-label={`Assigned to ${card.assignee}`}>
                        {card.assignee.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                ))}
                {col.cards.length === 0 && (
                  <div className="jowa-kanban__column-empty" aria-label="No cards in this column">
                    Drop cards here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

KanbanBoard.displayName = "KanbanBoard";
