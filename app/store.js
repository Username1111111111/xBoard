import { create } from "zustand"
import { liveblocks } from "@liveblocks/zustand"
import { createClient } from "@liveblocks/client"

const generateId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9)

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function getRandomColor() {
  return COLORS[getRandomInt(COLORS.length)]
}

const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB"
]

const client = createClient({
  publicApiKey:
    "pk_dev_QvEOtiB6QHZ0UcPR6MchZ3OC5i74Ncs-rFC8YIQfrTs-pFJ9heEiiB7dZKBXJqMG"
})

const useStore = create(
  liveblocks(
    (set, get) => ({
      boards: [],
      users: [],
      isCurrentUserCreated: false,
      currentUser: "",

      // Actions
      addBoard: boardName =>
        set(state => ({
          boards: [
            ...state.boards,
            {
              id: Math.random()
                .toString(36)
                .substr(2, 9),
              name: boardName
            }
          ]
        })),
      removeBoard: boardId =>
        set(state => ({
          boards: state.boards.filter(board => board.id !== boardId)
        })),
      createUser: username =>
        set(state => ({
          users: [...state.users, username]
        })),
      switchIfUserCreated: () =>
        set(state => ({
          isCurrentUserCreated: !state.isCurrentUserCreated
        })),
      setCurrentUser: providedUser =>
        set(state => ({
          currentUser: providedUser
        })),
        
      // Liveblocks specific
      shapes: {},
      selectedShape: null,
      isDragging: false,
      insertRectangle: () => {
        const { shapes, liveblocks } = get()

        const shapeId = Date.now().toString()
        const shape = {
          x: getRandomInt(300),
          y: getRandomInt(300),
          fill: getRandomColor()
        }

        liveblocks.room.updatePresence(
          { selectedShape: shapeId },
          { addToHistory: true }
        )
        set({
          shapes: { ...shapes, [shapeId]: shape }
        })
      },
      onShapePointerDown: shapeId => {
        const room = get().liveblocks.room
        room.history.pause()
        room.updatePresence({ selectedShape: shapeId }, { addToHistory: true })
        set({ isDragging: true })
      },
      deleteShape: () => {
        const { shapes, selectedShape, liveblocks } = get()
        const { [selectedShape]: shapeToDelete, ...newShapes } = shapes
        liveblocks.room.updatePresence(
          { selectedShape: null },
          { addToHistory: true }
        )
        set({
          shapes: newShapes
        })
      },
      onCanvasPointerUp: () => {
        set({ isDragging: false })
        get().liveblocks.room.history.resume()
      },
      onCanvasPointerMove: e => {
        e.preventDefault()

        const { isDragging, shapes, selectedShape } = get()

        const shape = shapes[selectedShape]

        if (shape && isDragging) {
          set({
            shapes: {
              ...shapes,
              [selectedShape]: {
                ...shape,
                x: e.clientX - 50,
                y: e.clientY - 50
              }
            }
          })
        }
      }
    }),
    {
      client,
      presenceMapping: { selectedShape: true },
      storageMapping: { shapes: true }
    }
  )
)

export default useStore

// const useStore = create<WithLiveblocks<Store, Presence>>()(
//   liveblocks(
//     (set, get) => ({

//     }),

//   )
// );
// export default useStore;
