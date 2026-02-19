import { Mail, FileText, BookOpen, Calendar, Users, MessageSquare, CheckSquare, Clock, Settings } from 'lucide-react';
import type { BackupItem } from '../../types';

const serviceIcons: Record<string, React.ReactNode> = {
  'Mail': <Mail size={16} color="#0078D4" />,
  'OneDrive': <FileText size={16} color="#0078D4" />,
  'Contacts': <BookOpen size={16} color="#0078D4" />,
  'Calendar': <Calendar size={16} color="#0078D4" />,
  'SharePoint & Teams Files': <Users size={16} color="#0078D4" />,
  'Teams Chats': <MessageSquare size={16} color="#0078D4" />,
  'Planner Plans': <CheckSquare size={16} color="#0078D4" />,
  'Entra ID': <Clock size={16} color="#0078D4" />,
};

interface Props {
  backups: BackupItem[];
}

export function CloudBackup({ backups }: Props) {
  return (
    <div className="widget col-6">
      <div className="widget-header">
        <h3 className="widget-title">Cloud Backup</h3>
        <button className="widget-manage-btn">
          <Settings size={14} />
          Manage
        </button>
      </div>
      <div className="backup-table-container">
        <table className="backup-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Last Backup</th>
              <th>Size</th>
              <th>Users</th>
              <th>Items</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {backups.map(backup => (
              <tr key={backup.service}>
                <td>
                  <div className="backup-service">
                    {serviceIcons[backup.service] || <FileText size={16} color="#0078D4" />}
                    <span>{backup.service}</span>
                  </div>
                </td>
                <td className="backup-time">{backup.lastBackup}</td>
                <td className="backup-size">{backup.size}</td>
                <td className="backup-count">{backup.users ?? '—'}</td>
                <td className="backup-count">{backup.items.toLocaleString()}</td>
                <td><button className="backup-restore-btn">Restore</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
