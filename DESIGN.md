# PA.DEV Visual System

## Direction

Warm editorial technology: ยึดจังหวะ cream/coral/dark จากไฟล์ DESIGN-claude.md แต่เปลี่ยนพื้นที่มืดให้ทำหน้าที่เหมือน code editor และ terminal เพื่อสะท้อนตัวตนครูคอมพิวเตอร์ งานต้องล้ำและละเอียดโดยไม่กลายเป็นธีมเกม

## Color

- Canvas: `#faf9f5`
- Soft surface: `#f2ece3`
- Dark workspace: `#171816`
- Dark elevated: `#242520`
- Ink: `#171714`
- Body: `#44443f`
- Muted: `#6f6d65`
- Coral primary: `#cc785c`
- Coral active: `#a9583e`
- Teal status: `#64b9a8`
- Amber highlight: `#e8a55a`
- Hairline: `#ded8cf`

## Typography

- UI and Thai content: IBM Plex Sans Thai, system sans-serif
- Editorial headings: IBM Plex Sans Thai at a lighter weight for Thai; Cormorant Garamond for short Latin display text
- Code and metadata: JetBrains Mono
- Headings remain restrained and readable; UI labels never use a display serif.

## Shape and Depth

- Inputs and buttons: 8px radius
- Content panels: 12–16px radius
- Pills only for status and compact metadata
- Depth comes from alternating surfaces and fine borders; shadows are rare and tight

## Layout

- Desktop: persistent left navigation, wide evidence workspace
- Mobile: compact top bar and horizontal section switcher
- Max content width approximately 1480px
- Each section begins with a concise heading, completion cue, and evidence area

## Signature Components

- Dark code-terminal hero with live clock and annual cycle indicator
- Two-round switcher that changes content context without hiding the overall annual story
- Editable fact rows for personal information, workload, salary, and schedule
- Evidence gallery with drag-and-drop upload, captions, full-screen viewing, and deletion in edit mode
- Presentation/edit mode switch with clear saving feedback

## Motion

- 160–220ms state transitions
- Small terminal cursor and status pulse only
- No decorative page-load choreography
- Reduced-motion mode disables nonessential transitions and pulses
