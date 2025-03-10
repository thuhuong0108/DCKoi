import React, { useState, useEffect } from 'react';
import {
    Modal,
    TextField,
    Button,
    IconButton,
    Typography,
    Box,
    Divider,
    Avatar,
    Chip
} from '@mui/material';
import {
    Close,
    Description,
    AccessTime,
    CheckCircleOutline,
    Label,
    AttachFile,
    Comment,
    Person
} from '@mui/icons-material';
import { TemplateConstructionItemType } from '@/models';

interface TaskDetailModalProps {
    item: TemplateConstructionItemType | null;
    open: boolean;
    onClose: () => void;
    onUpdate: (updatedItem: TemplateConstructionItemType) => void;
}

const TaskDetailModal = ({ item, open, onClose, onUpdate }: TaskDetailModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Chưa hoàn thành');
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (item) {
            setName(item.name);
            setDescription(item.description || '');
            // In a real app, you would fetch additional task details here
        }
    }, [item]);

    const handleUpdate = () => {
        if (!item) return;

        const updatedItem = {
            ...item,
            name,
            description
        };

        onUpdate(updatedItem);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    if (!item) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="task-detail-modal"
        >
            <Box className="bg-white p-6 rounded-lg mx-auto mt-16 max-w-4xl max-h-3/4 overflow-y-auto">
                <Box className="flex justify-between items-center mb-4">
                    <Box className="flex items-center">
                        <Label className="mr-2 text-blue-500" />
                        <Typography variant="h5" component="h2" className="font-bold">
                            {item.name}
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>

                <Box className="grid grid-cols-3 gap-6">
                    <Box className="col-span-2">
                        <Box className="mb-6">
                            <Box className="flex items-center mb-2">
                                <Description className="mr-2 text-gray-600" />
                                <Typography variant="h6">Mô tả</Typography>
                            </Box>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Thêm mô tả chi tiết cho công việc này..."
                                className="bg-gray-50"
                            />
                        </Box>

                        <Box className="mb-6">
                            <Box className="flex items-center mb-2">
                                <Comment className="mr-2 text-gray-600" />
                                <Typography variant="h6">Bình luận</Typography>
                            </Box>

                            <Box className="mb-4">
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    variant="outlined"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Thêm bình luận..."
                                    className="bg-gray-50 mb-2"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddComment}
                                    disabled={!newComment.trim()}
                                >
                                    Bình luận
                                </Button>
                            </Box>

                            <Box className="space-y-4">
                                {comments.map((comment, index) => (
                                    <Box key={index} className="bg-gray-50 p-3 rounded-lg">
                                        <Box className="flex items-center mb-2">
                                            <Avatar className="w-8 h-8 mr-2">U</Avatar>
                                            <Typography variant="subtitle2">Người dùng</Typography>
                                            <Typography variant="caption" className="ml-auto text-gray-500">
                                                Vừa xong
                                            </Typography>
                                        </Box>
                                        <Typography>{comment}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    <Box className="col-span-1">
                        <Typography variant="subtitle1" className="mb-2 font-semibold">
                            Thao tác
                        </Typography>

                        <Box className="space-y-3">
                            <Box className="mb-4">
                                <Typography variant="subtitle2" className="mb-1 text-gray-600">
                                    Trạng thái
                                </Typography>
                                <Box className="flex gap-2">
                                    <Chip
                                        label={status}
                                        color={status === 'Hoàn thành' ? 'success' : 'default'}
                                        className="cursor-pointer"
                                        onClick={() => setStatus(status === 'Hoàn thành' ? 'Chưa hoàn thành' : 'Hoàn thành')}
                                    />
                                </Box>
                            </Box>

                            <Box className="mb-4">
                                <Typography variant="subtitle2" className="mb-1 text-gray-600">
                                    Người thực hiện
                                </Typography>
                                <Button variant="outlined" startIcon={<Person />} className="w-full justify-start">
                                    Thêm người thực hiện
                                </Button>
                            </Box>

                            <Box className="mb-4">
                                <Typography variant="subtitle2" className="mb-1 text-gray-600">
                                    Hạn hoàn thành
                                </Typography>
                                <Button variant="outlined" startIcon={<AccessTime />} className="w-full justify-start">
                                    Đặt hạn hoàn thành
                                </Button>
                            </Box>

                            <Box className="mb-4">
                                <Typography variant="subtitle2" className="mb-1 text-gray-600">
                                    Đính kèm
                                </Typography>
                                <Button variant="outlined" startIcon={<AttachFile />} className="w-full justify-start">
                                    Thêm tệp đính kèm
                                </Button>
                            </Box>
                        </Box>

                        <Divider className="my-4" />

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleUpdate}
                            className="mt-4"
                        >
                            Lưu thay đổi
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default TaskDetailModal;