import { TemplateConstructionItemType } from '@/models';
import {
    Add,
    Close,
    CollectionsOutlined,
    Comment,
    Edit
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Chip,
    ClickAwayListener,
    IconButton,
    InputBase,
    Modal,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

interface TaskDetailModalProps {
    item: TemplateConstructionItemType | null;
    open: boolean;
    onClose: () => void;
    onUpdate: (updatedItem: TemplateConstructionItemType) => void;
}

interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
    priority?: boolean;
    editing?: boolean;
}

const TaskDetailModal = ({ item, open, onClose, onUpdate }: TaskDetailModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [todoItems, setTodoItems] = useState<TodoItem[]>([
        { id: 1, text: 'to-do item', completed: false },
        { id: 2, text: 'to-do item', completed: false },
        { id: 3, text: 'to-do item', completed: false, priority: true },
        { id: 4, text: 'to-do item', completed: true }
    ]);
    const [editingText, setEditingText] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [activities, setActivities] = useState([
        { user: 'Hoang Thi Thu Huong', action: 'vừa thêm công việc', time: '1 giờ trước' },
        { user: 'Hoang Thi Thu Huong', action: 'vừa thêm công việc', time: '1 giờ trước' },
        { user: 'Hoang Thi Thu Huong', action: 'vừa thêm công việc', time: '1 giờ trước' },
        { user: 'Hoang Thi Thu Huong', action: 'vừa thêm công việc', time: '1 giờ trước' },
        { user: 'Hoang Thi Thu Huong', action: 'vừa thêm công việc', time: '1 giờ trước' },
        { user: 'Hoang Thi Thu Huong', action: 'vừa thêm công việc', time: '1 giờ trước' }
    ]);

    const editInputRef = useRef<HTMLInputElement>(null);

    // Calculate progress based on completed items
    const progress = todoItems.length > 0
        ? Math.round((todoItems.filter(item => item.completed).length / todoItems.length) * 100)
        : 0;

    useEffect(() => {
        if (item) {
            setName(item.name);
            setDescription(item.description || '');
            setDeadline('21/12/2024');
            setTime('19:42');
        }
    }, [item]);

    useEffect(() => {
        // Focus on input when editing starts
        if (editInputRef.current && editingId !== null) {
            editInputRef.current.focus();
        }
    }, [editingId]);

    const handleToggleTodoItem = (id: number) => {
        setTodoItems(todoItems.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));

        // Add to activity log
        const todoItem = todoItems.find(item => item.id === id);
        if (todoItem) {
            const newStatus = !todoItem.completed ? 'hoàn thành' : 'đã mở lại';
            addActivity(`${newStatus} công việc "${todoItem.text}"`);
        }
    };

    const handleStartEditing = (id: number) => {
        // Stop editing if we're already editing something else
        if (editingId !== null && editingId !== id) {
            handleFinishEditing();
        }

        const todoItem = todoItems.find(item => item.id === id);
        if (todoItem) {
            setEditingText(todoItem.text);
            setEditingId(id);
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingText(e.target.value);
    };

    const handleFinishEditing = () => {
        if (editingId !== null) {
            // Update the todo item with the new text
            setTodoItems(todoItems.map(item =>
                item.id === editingId ? { ...item, text: editingText } : item
            ));

            // Reset editing state
            setEditingId(null);
            setEditingText('');
        }
    };

    const handleAddTodoItem = () => {
        // Finish any current editing
        if (editingId !== null) {
            handleFinishEditing();
        }

        const newId = Math.max(...todoItems.map(item => item.id), 0) + 1;
        const newItem = { id: newId, text: 'Công việc mới', completed: false };
        setTodoItems([...todoItems, newItem]);

        // Start editing the new item
        setEditingId(newId);
        setEditingText('Công việc mới');

        // Add to activity log
        addActivity('Thêm công việc mới');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleFinishEditing();
        }
    };

    const addActivity = (action: string) => {
        const newActivity = {
            user: 'Hoang Thi Thu Huong',
            action: action,
            time: 'ngay bây giờ'
        };
        setActivities([newActivity, ...activities]);
    };

    if (!item) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="task-detail-modal"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '700px',
                bgcolor: 'background.paper',
                borderRadius: '8px',
                boxShadow: 24,
                p: 0,
                maxHeight: '90vh',
                overflow: 'auto'
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: '1px solid #eaeaea'
                }}>
                    <Typography variant="h6" component="h2" fontWeight="bold">
                        {name}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Chip label="Site preparation" color="primary" sx={{ mr: 2, backgroundColor: '#c3dbf7', color: '#2962ff', fontWeight: 'normal' }} />
                        <IconButton onClick={onClose} size="small">
                            <Close />
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ p: 2 }}>
                    <Box sx={{ borderBottom: '1px dotted #eaeaea', pb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Nhân viên
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Avatar sx={{ width: 32, height: 32 }} />
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Hạn chót
                                </Typography>
                                <Box sx={{ display: 'flex', mt: 1 }}>
                                    <TextField
                                        size="small"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        sx={{ width: '80px', mr: 1 }}
                                    />
                                    <TextField
                                        size="small"
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                        sx={{ width: '120px', mr: 1 }}
                                    />
                                    <Chip
                                        label="Out Date"
                                        size="small"
                                        sx={{
                                            backgroundColor: '#f8d7da',
                                            color: '#dc3545',
                                            height: '40px',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    <IconButton sx={{ ml: 1 }}>
                                        <CollectionsOutlined />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="textSecondary">
                                Mô tả chi tiết
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                placeholder="Thêm thông tin mô tả chi tiết"
                                variant="outlined"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                sx={{ mt: 1, backgroundColor: '#f9f9f9' }}
                            />
                        </Box>

                        <Box sx={{ border: '1px solid #eaeaea', borderRadius: '8px', p: 2, mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Typography variant="body1" fontWeight="bold">
                                    {`${progress}%`}
                                </Typography>
                                <Box sx={{
                                    bgcolor: '#e9ecef',
                                    height: '8px',
                                    borderRadius: '4px',
                                    ml: 2,
                                    flexGrow: 1,
                                    position: 'relative'
                                }}>
                                    <Box sx={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        height: '100%',
                                        width: `${progress}%`,
                                        borderRadius: '4px',
                                        bgcolor: '#0d6efd',
                                        transition: 'width 0.3s ease-in-out'
                                    }} />
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {todoItems.map((item) => (
                                    <Box key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={item.completed}
                                            onChange={() => handleToggleTodoItem(item.id)}
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        />
                                        {item.priority && (
                                            <Box component="span" sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '16px',
                                                height: '16px',
                                                borderRadius: '4px',
                                                bgcolor: '#dc3545',
                                                color: 'white',
                                                fontSize: '12px',
                                                mr: 1
                                            }}>
                                                !
                                            </Box>
                                        )}

                                        {editingId === item.id ? (
                                            <ClickAwayListener onClickAway={handleFinishEditing}>
                                                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                                                    <InputBase
                                                        inputRef={editInputRef}
                                                        value={editingText}
                                                        onChange={handleEditChange}
                                                        onKeyDown={handleKeyDown}
                                                        autoFocus
                                                        fullWidth
                                                        sx={{
                                                            ml: 1,
                                                            padding: '2px 8px',
                                                            backgroundColor: '#f5f5f5',
                                                            borderRadius: 1,
                                                            '& .MuiInputBase-input': {
                                                                padding: '4px 0'
                                                            }
                                                        }}
                                                    />
                                                </Box>
                                            </ClickAwayListener>
                                        ) : (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexGrow: 1,
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    onClick={() => handleStartEditing(item.id)}
                                                    sx={{
                                                        textDecoration: item.completed ? 'line-through' : 'none',
                                                        color: item.completed ? '#6c757d' : 'text.primary',
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            backgroundColor: '#f5f5f5'
                                                        },
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        width: '100%'
                                                    }}
                                                >
                                                    {item.text}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    sx={{ opacity: 0.5, '&:hover': { opacity: 1 } }}
                                                    onClick={() => handleStartEditing(item.id)}
                                                >
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </Box>
                                ))}
                                <Button
                                    startIcon={<Add />}
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleAddTodoItem}
                                    sx={{
                                        justifyContent: 'center',
                                        mt: 1,
                                        borderStyle: 'dashed',
                                        borderWidth: '1px'
                                    }}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton size="small">
                                <Comment fontSize="small" />
                            </IconButton>
                            <Typography variant="body2" color="textSecondary">
                                Hoạt động
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            {activities.map((activity, index) => (
                                <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                                    <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                                    <Box>
                                        <Typography variant="body2" fontWeight="bold">
                                            {activity.user} <span style={{ fontWeight: 'normal' }}>{activity.action}</span>
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            {activity.time}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default TaskDetailModal;