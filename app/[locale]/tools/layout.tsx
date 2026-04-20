import { ToolsLayoutWrapper } from '@/components/tools/ToolsLayoutWrapper'

interface ToolsLayoutProps {
  children: React.ReactNode
}

export default function ToolsLayout({ children }: ToolsLayoutProps) {
  return <ToolsLayoutWrapper>{children}</ToolsLayoutWrapper>
}
