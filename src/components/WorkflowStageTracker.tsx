import React, { useState } from 'react';
import {
  Clock,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  SkipForward,
  User,
  AlertCircle
} from 'lucide-react';
import { ProductionWorkflowStage, WorkflowStageStatus } from '../types/production';

interface WorkflowStageTrackerProps {
  stages: ProductionWorkflowStage[];
  onStageUpdate: (stageId: string, updates: Partial<ProductionWorkflowStage>) => void;
  readOnly?: boolean;
}

const WorkflowStageTracker: React.FC<WorkflowStageTrackerProps> = ({
  stages,
  onStageUpdate,
  readOnly = false
}) => {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  const getStageIcon = (status: WorkflowStageStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-gray-400" />;
      case 'in_progress':
        return <Play className="w-5 h-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'skipped':
        return <SkipForward className="w-5 h-5 text-gray-400" />;
      case 'blocked':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStageColor = (status: WorkflowStageStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 border-gray-300';
      case 'in_progress':
        return 'bg-blue-50 border-blue-300';
      case 'completed':
        return 'bg-green-50 border-green-300';
      case 'skipped':
        return 'bg-gray-50 border-gray-200';
      case 'blocked':
        return 'bg-red-50 border-red-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const getStatusBadge = (status: WorkflowStageStatus) => {
    const badges = {
      pending: { label: 'Pending', className: 'bg-gray-100 text-gray-700' },
      in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-700' },
      completed: { label: 'Completed', className: 'bg-green-100 text-green-700' },
      skipped: { label: 'Skipped', className: 'bg-gray-100 text-gray-600' },
      blocked: { label: 'Blocked', className: 'bg-red-100 text-red-700' }
    };

    const badge = badges[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.className}`}>
        {badge.label}
      </span>
    );
  };

  const handleStartStage = (stageId: string) => {
    onStageUpdate(stageId, {
      status: 'in_progress',
      startedAt: new Date().toISOString()
    });
  };

  const handleCompleteStage = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    if (stage?.startedAt) {
      const duration = Math.floor(
        (new Date().getTime() - new Date(stage.startedAt).getTime()) / (1000 * 60)
      );
      onStageUpdate(stageId, {
        status: 'completed',
        completedAt: new Date().toISOString(),
        actualDurationMinutes: duration
      });
    }
  };

  const handleSkipStage = (stageId: string) => {
    onStageUpdate(stageId, { status: 'skipped' });
  };

  const handleBlockStage = (stageId: string) => {
    onStageUpdate(stageId, { status: 'blocked' });
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'N/A';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const canStartStage = (stage: ProductionWorkflowStage) => {
    if (readOnly) return false;
    if (stage.status !== 'pending') return false;

    const previousStageIndex = stage.stageOrder - 2;
    if (previousStageIndex < 0) return true;

    const previousStage = stages[previousStageIndex];
    return previousStage?.status === 'completed' || previousStage?.status === 'skipped';
  };

  return (
    <div className="space-y-2">
      {stages
        .sort((a, b) => a.stageOrder - b.stageOrder)
        .map((stage, index) => (
          <div key={stage.id} className="relative">
            {index > 0 && (
              <div className="absolute left-6 -top-2 w-0.5 h-2 bg-gray-300" />
            )}

            <div
              className={`border-2 rounded-lg p-4 transition-all ${getStageColor(
                stage.status
              )}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-current">
                    {getStageIcon(stage.status)}
                  </div>

                  <div className="ml-4 flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-semibold text-gray-900">{stage.stageName}</h4>
                      {getStatusBadge(stage.status)}
                    </div>

                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Est: {formatDuration(stage.estimatedDurationMinutes)}
                      </span>

                      {stage.actualDurationMinutes && (
                        <span className="flex items-center">
                          Actual: {formatDuration(stage.actualDurationMinutes)}
                        </span>
                      )}

                      {stage.assignedStaffName && (
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {stage.assignedStaffName}
                        </span>
                      )}
                    </div>

                    {expandedStage === stage.id && (
                      <div className="mt-3 space-y-2 text-sm">
                        {stage.startedAt && (
                          <div className="text-gray-600">
                            <span className="font-medium">Started:</span> {formatTime(stage.startedAt)}
                          </div>
                        )}

                        {stage.completedAt && (
                          <div className="text-gray-600">
                            <span className="font-medium">Completed:</span> {formatTime(stage.completedAt)}
                          </div>
                        )}

                        {stage.notes && (
                          <div className="text-gray-600">
                            <span className="font-medium">Notes:</span> {stage.notes}
                          </div>
                        )}

                        {stage.qualityCheckPassed !== undefined && (
                          <div className="flex items-center">
                            <span className="font-medium mr-2">Quality Check:</span>
                            {stage.qualityCheckPassed ? (
                              <span className="flex items-center text-green-600">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Passed
                              </span>
                            ) : (
                              <span className="flex items-center text-red-600">
                                <XCircle className="w-4 h-4 mr-1" />
                                Failed
                              </span>
                            )}
                          </div>
                        )}

                        {stage.qualityNotes && (
                          <div className="text-gray-600">
                            <span className="font-medium">Quality Notes:</span> {stage.qualityNotes}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {!readOnly && (
                  <div className="flex items-center gap-2 ml-4">
                    {stage.status === 'pending' && canStartStage(stage) && (
                      <button
                        onClick={() => handleStartStage(stage.id)}
                        className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </button>
                    )}

                    {stage.status === 'in_progress' && (
                      <button
                        onClick={() => handleCompleteStage(stage.id)}
                        className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Complete
                      </button>
                    )}

                    {stage.status === 'pending' && (
                      <button
                        onClick={() => handleSkipStage(stage.id)}
                        className="flex items-center px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                      >
                        <SkipForward className="w-4 h-4 mr-1" />
                        Skip
                      </button>
                    )}

                    {(stage.status === 'pending' || stage.status === 'in_progress') && (
                      <button
                        onClick={() => handleBlockStage(stage.id)}
                        className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Block
                      </button>
                    )}

                    <button
                      onClick={() =>
                        setExpandedStage(expandedStage === stage.id ? null : stage.id)
                      }
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {expandedStage === stage.id ? 'Less' : 'More'}
                    </button>
                  </div>
                )}
              </div>

              {stage.status === 'blocked' && (
                <div className="mt-3 flex items-start p-3 bg-red-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <div className="font-medium">Stage Blocked</div>
                    <div className="mt-1">
                      {stage.notes || 'This stage is blocked and cannot proceed'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default WorkflowStageTracker;
