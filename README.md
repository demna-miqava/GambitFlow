# ChessHub

A modern, real-time chess application built with React, TypeScript, and WebSockets. Play chess online with friends, track your statistics, and improve your game.

## Features

### Live Gameplay

- **Real-time multiplayer chess** with WebSocket support
- **Quick match system** with customizable time controls
- **Visual chessboard** powered by Chessground
- **Sound effects** for moves, captures, and game events
- **Move history** with full game navigation
- **Draw offers and resignation** support
- **Rematch system** for quick rematches

### User Experience

- **Beautiful UI** with vibrant, accessible color palette
- **Dark and light themes** for comfortable viewing
- **Responsive design** for desktop and mobile
- **Real-time game state synchronization**
- **Accessibility features** with ARIA labels and WCAG compliance

### Statistics & Profile

- **Comprehensive stats** tracking wins, losses, draws
- **Rating system** with visible rating changes
- **Game history** with detailed move records
- **User profiles** with personalized statistics

### Analysis Mode

- **Stockfish Integration** - Deep engine analysis running in web workers
- **Evaluation Bar** - Real-time visual advantage indicator
- **Multi-PV Analysis** - View multiple best lines with scores
- **Archive Analysis** - Review past games with engine assistance

### Learning & Practice

- **Puzzles** - Sharpen your skills with different puzzle modes like Survival
- **Import Game** - rigorous analysis by importing PGNs from other platforms

### Social & Community

- **Friends System** - Add friends and see their status
- **Smart Notifications** - Real-time alerts for game invites and friend requests

### Upcoming Features

- **Spectator mode** - Watch ongoing games of your friends
- **Tournaments** - Organized competitive play events

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling with custom theme system
- **shadcn/ui** - UI component library
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Chessground** - Interactive chessboard
- **Chess.js** - Chess logic and validation
- **WebSockets** - Real-time communication
- **Web Workers** - Off-main-thread processing
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A running backend server (see backend repository)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd chesshub-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Edit `.env` and configure your environment variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WS_BASE_URL=ws://localhost:8080/ws

# Sound URLs (optional - update with your hosted sound files)
VITE_MOVE_SOUND_URL=https://example.com/sounds/move.mp3
VITE_CAPTURE_SOUND_URL=https://example.com/sounds/capture.mp3
VITE_GENERIC_SOUND_URL=https://example.com/sounds/generic.mp3
```

### Environment Variables

| Variable                 | Description                  | Example                                  |
| ------------------------ | ---------------------------- | ---------------------------------------- |
| `VITE_API_BASE_URL`      | Backend API base URL         | `http://localhost:8080/api`              |
| `VITE_WS_BASE_URL`       | WebSocket server URL         | `ws://localhost:8080/ws`                 |
| `VITE_MOVE_SOUND_URL`    | URL for move sound effect    | `https://example.com/sounds/move.mp3`    |
| `VITE_CAPTURE_SOUND_URL` | URL for capture sound effect | `https://example.com/sounds/capture.mp3` |
| `VITE_GENERIC_SOUND_URL` | URL for generic sound effect | `https://example.com/sounds/generic.mp3` |

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
├── features/           # Feature-based modules
│   ├── archive-game/  # Game archive and history
│   ├── auth/          # Authentication
│   ├── create-game/   # Game creation and setup
│   ├── current-game/  # Live game functionality
│   ├── engine-analysis/ # Stockfish analysis & evaluation
│   ├── friends/       # Friend system and interactions
│   ├── game/          # Shared game components
│   ├── game-table/    # Game list and observation
│   ├── import-game/   # PGN import functionality
│   ├── matchmaking/   # Match finding logic
│   ├── notifications/ # User notifications
│   ├── profile/       # User profile management
│   ├── puzzles/       # Chess puzzles and training
│   ├── settings/      # User settings
│   └── stats/         # Statistics and profiles
├── hooks/             # Custom React hooks
├── contexts/          # React contexts
├── services/          # API services
├── constants/         # App constants
├── utils/             # Utility functions
└── pages/             # Page components
```

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0) - see the [LICENSE](LICENSE) file for details.

This project uses [Chessground](https://github.com/lichess-org/chessground), which is licensed under GPL-3.0. As required by the GPL-3.0 license, this project must also be distributed under GPL-3.0.

## Acknowledgments

- [Chessground](https://github.com/lichess-org/chessground) - Interactive chessboard
- [Chess.js](https://github.com/jhlywa/chess.js) - Chess logic
