import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, Typography, theme, Table, Modal, Form, Input, Button, Select, Upload, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// Đảm bảo bạn đã cài đặt react-toastify 
// Import Quill styles




const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;


// Đây là danh sách các mục menu cho phần điều hướng bên trái của trang Dashboard. Mỗi mục có một key, icon, và label để xác định và hiển thị trong menu.
const items2 = [
    {
        key: 'sub1',
        icon: <UserOutlined />,
        label: 'Người Dùng',

    },
    {
        key: 'sub2',
        icon: <LaptopOutlined />,
        label: 'Gói tập và Dịch vụ',
        children: [
            { key: 'sub2-1', label: 'Quản lý gói tập' },
            { key: 'sub2-2', label: 'Dịch vụ' },
        ],
    },
    {
        key: 'sub3',
        icon: <NotificationOutlined />,
        label: 'Đơn Hàng',

    },

];

// Sample data and columns for each subnav item






const DashboardPage = () => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const [recordToOrder, setRecordOrder] = useState(null);
    const [recordToEdit, setRecordToEdit] = useState(null);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [selectedMenuKey, setSelectedMenuKey] = useState('sub1');
    const [dataSource, setDataSource] = useState([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [category, setCategories] = useState([]);
    const [gymPackage, setGymPackage] = useState([]);
    const [service, setService] = useState([]);


    const statusColors = {
        'Đang xử lý': 'bg-yellow-200 text-yellow-800',
        'Đang giao hàng': 'bg-blue-200 text-blue-800',
        'Hoàn thành': 'bg-green-200 text-green-800',
        'Đã hủy': 'bg-red-200 text-red-800',
    };



    const validatePrice = (_, value) => {
        if (value < 0) {
            return Promise.reject(new Error('Vui lòng nhập giá hợp lệ!'));
        }
        return Promise.resolve();
    };

    const fetchService = async () => {
        console.log("Fetching gym packages..."); // Kiểm tra xem đoạn code có chạy đến đây không

        try {
            const response = await fetch('http://localhost:3002/service/getAllServices');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched data:", data); // Kiểm tra dữ liệu trả về
            setService(data);
        } catch (error) {
            console.error("Error fetching gym packages:", error);
        }
    };

    useEffect(() => {
        fetchService();
    }, []);


    //Lấy package
    const fetchGymPackage = async () => {
        console.log("Fetching gym packages..."); // Kiểm tra xem đoạn code có chạy đến đây không

        try {
            const response = await fetch('http://localhost:3002/gymPackage/getAllPackage');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched data:", data); // Kiểm tra dữ liệu trả về
            setGymPackage(data);
        } catch (error) {
            console.error("Error fetching gym packages:", error);
        }
    };

    useEffect(() => {
        fetchGymPackage();
    }, []);

    //Thêm loại sản phẩm
    const addService = async (serviceData) => {
        try {
            const response = await axios.post('http://localhost:3002/service/addService', serviceData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Đảm bảo header Content-Type là multipart/form-data khi gửi FormData
                }
            });
            // Xử lý khi request thành công
            console.log('Thêm thành công:', response.data);

            // Cập nhật state hoặc thực hiện các hành động khác sau khi thêm thành công
            // Tải lại danh sách dịch vụ
        } catch (error) {
            // Xử lý khi có lỗi xảy ra
            console.error('Lỗi khi thêm:', error);
        }
    };



    //Thêm gói tập
    // Thêm gói tập
    const addGymPackage = async (gymPackageData) => {
        try {
            const response = await axios.post('http://localhost:3002/gymPackage/addGymPackage', gymPackageData, {
                headers: {
                    'Content-Type': 'application/json' // Đảm bảo header Content-Type là application/json khi gửi JSON
                }
            });
            // Xử lý khi request thành công
            console.log('Thêm thành công:', response.data);

            // Cập nhật state hoặc thực hiện các hành động khác sau khi thêm thành công
            // Tải lại danh sách dịch vụ
        } catch (error) {
            // Xử lý khi có lỗi xảy ra
            console.error('Lỗi khi thêm:', error);
        }
    };



    //nút edit
    const handleEdit = (record) => {
        setRecordToEdit(record);
        form.setFieldsValue(record);
        setEditModalVisible(true);
    };

    // Khi nhấn vào nút Order

    //nút xóa
    const handleDelete = (record) => {
        setRecordToDelete(record);
        setDeleteModalVisible(true);
    };

    //đóng modal orderview
    const handleCloseModal = () => {
        setOrderModalVisible(false);
    };




    //nút ok khi thêm 
    const handleAddModalOk = () => {
        // Xác thực dữ liệu nhập từ form và lấy các giá trị.
        form.validateFields().then(values => {
            if (selectedMenuKey === 'sub2-1') {
                // Tạo một đối tượng chứa dữ liệu gói tập
                const gymPackageData = {
                    name: values.name,
                    price: values.price,
                    description: values.description,
                    serviceId: values.serviceId
                };

                // Gọi hàm addGymPackage với đối tượng gymPackageData
                addGymPackage(gymPackageData);

                // Gọi hàm để tải lại danh sách gói tập
                fetchGymPackage();

            } else if (selectedMenuKey === 'sub2-2') {
                const serviceData = new FormData();
                serviceData.append('serviceName', values.serviceName);
                serviceData.append('description', values.description);
                serviceData.append('content', values.content);
                serviceData.append('layout', values.layout);
                // Kiểm tra và thêm tệp ảnh nếu có
                if (values.file && values.file.fileList && values.file.fileList.length > 0) {
                    serviceData.append('image', values.file.fileList[0].originFileObj); // Thêm tệp ảnh từ fileList
                } else {
                    console.error('File không hợp lệ hoặc không tồn tại');
                    return;
                }
                addService(serviceData);
                fetchService();
            }
            setAddModalVisible(false);


        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };
    //Nút ok khi xóa
    const handleDeleteModalOk = () => {
        if (recordToDelete) {
            try {

                // Xóa dữ liệu từ server
                switch (selectedMenuKey) {
                    case 'sub2-1':


                        // Xóa người dùng
                        break;
                    case 'sub2-2':


                        // Xóa người dùng
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error('Error deleting data:', error);
            }
            setDeleteModalVisible(false);

        }

    };
    //Nút cancel
    const handleModalCancel = () => {
        setEditModalVisible(false);
        setDeleteModalVisible(false);
        setAddModalVisible(false);
        setOrderModalVisible(false)
    };


    const handleMenuClick = ({ key }) => {
        setSelectedMenuKey(key);
    };
    //Hàm lưu dữ liệu datasource
    useEffect(() => {
        switch (selectedMenuKey) {
            case 'sub1':
                setDataSource(service);
                break;
            case 'sub2-1':
                setDataSource(gymPackage);
                break;
            case 'sub2-2':
                setDataSource(service);
                break;
            case 'sub3':
                setDataSource(service);
                break;
            default:
                break;
        }
    }, [selectedMenuKey, service, products, service]);

    const handleAddNewRecord = () => {
        setAddModalVisible(true);
        form.resetFields();
    };

    const serviceColumns = [
        {
            title: 'Tên',
            dataIndex: 'serviceName',
            key: 'serviceName',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => (
                <img src={`/images/${record.image}`} alt={record.packageName} style={{ maxWidth: '500px' }} />

            ),
        },

        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const gymPackageColums = [
        {
            title: 'Tên gói',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            // render: (price) => {
            //     if (typeof price === 'number') {
            //         return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            //     }
            // },
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const CategoryColumns = [
        {
            title: 'ID',
            dataIndex: 'id_loaisanpham',
            key: 'id_loaisanpham',
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'ten_loaisp',
            key: 'ten_loaisp',
        },
        {
            title: 'Ảnh',
            dataIndex: 'banner',
            key: 'banner',
            render: (text, record) => (
                <img src={`images/${record.banner}`} alt={record.ten_loaisp} style={{ maxWidth: '100px' }} />

            ),
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const orderColumns = [
        {
            title: 'Mã đơn',
            dataIndex: 'id_order',
            key: 'id_order',
        },
        {
            title: 'Ngày tạo đơn',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Khách hàng',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_price',
            key: 'total',
            render: (total_price) => {
                if (typeof total_price === 'number') {
                    return total_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                }
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <div
                    className={`inline-block px-4 py-1 rounded-md ${statusColors[status] || 'bg-gray-200 text-gray-800'}`}
                >
                    {status}
                </div>
            ),
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => {
                // Kiểm tra nếu trạng thái là 'Hoàn thành', thì không hiển thị các nút hành động
                if (record.status === 'Hoàn thành') {
                    return null; // Không hiển thị gì cả
                }

                // Nếu trạng thái không phải là 'Hoàn thành', hiển thị các nút Order và Delete
                return (
                    <span>
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            style={{ marginRight: 16 }}
                        // onClick={() => handleOrder(record)}
                        >
                            Order
                        </Button>
                        <Button
                            type="link"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record)}
                        >
                            Delete
                        </Button>
                    </span>
                );
            },
        },
    ];



    //lấy bảng
    const getColumns = () => {
        switch (selectedMenuKey) {
            case 'sub1':
                return service;
            case 'sub2-1':
                return gymPackageColums;
            case 'sub2-2':
                return serviceColumns;
            case 'sub3':
                return orderColumns;

            default:
                return [];
        }
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo">
                    <img alt="Logo" style={{ width: '200px', marginTop: '20px' }} />
                </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ flex: 1, minWidth: 0 }} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar size="default" icon={<UserOutlined />} alt="User Avatar" style={{ marginRight: 16 }} />
                    <Text style={{ color: '#fff' }}>Trần Huỳnh Thưc</Text>
                </div>
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }} />
                <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}>
                    <Sider style={{ background: colorBgContainer }} width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['sub1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                            items={items2}
                            //Lấy menu
                            onClick={handleMenuClick} // Handle menu click
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: '77vh' }}>
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNewRecord} style={{ marginBottom: 16 }}>
                            Add New
                        </Button>


                        <Table
                            dataSource={dataSource}
                            columns={getColumns()}
                            pagination={false}
                            rowSelection={{
                                type: 'checkbox',
                                onSelectAll: (selected, selectedRows, changeRows) => {
                                    console.log(selected, selectedRows, changeRows);
                                },
                            }}
                        />

                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                PTGAMING ©{new Date().getFullYear()} Created by Ant UED
            </Footer>

            <Modal
                title="Chỉnh Sửa"
                visible={editModalVisible}
                // onOk={handleEditModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} layout="vertical">
                    {selectedMenuKey === 'sub1' && (
                        <>
                            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please input the age!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input the address!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please input the phone number!' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    )}
                    {selectedMenuKey === 'sub2-1' && (
                        <>
                            <Form.Item name="ten_sanpham" label="Tên sản phẩm" rules={[{ required: true, message: 'Please input the name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="mo_ta" label="Mô tả" rules={[{ required: true, message: 'Please input the price!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="gia" label="Giá" rules={[{ required: true, message: 'Please input the stock!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="id_loaisanpham"
                                label="Loại sản phẩm"
                                rules={[{ required: true, message: 'Please select a category!' }]}
                            >
                                <Select
                                    placeholder="Chọn loại sản phẩm"

                                >
                                    {category.map((category) => (
                                        <Option key={category.id_loaisanpham} value={category.id_loaisanpham}>
                                            {category.ten_loaisp}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="anh" label="anh" rules={[{ required: true, message: 'Please input the stock!' }]}>
                                <Upload

                                >
                                    <Button icon={<UploadOutlined />}>Click để tải lên</Button>
                                </Upload>
                            </Form.Item>
                        </>
                    )}
                    {selectedMenuKey === 'sub2-2' && (
                        <Form.Item name="ten_loaisp" label="Tên loại sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm!' }]}>
                            <Input />
                        </Form.Item>

                    )}

                    {selectedMenuKey === 'sub3' && (
                        <>
                            <Form.Item name="orderId" label="Order ID" rules={[{ required: true, message: 'Please input the order ID!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="customer" label="Customer" rules={[{ required: true, message: 'Please input the customer!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="total" label="Total" rules={[{ required: true, message: 'Please input the total!' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>

            <Modal
                title="Xóa"
                visible={deleteModalVisible}
                onOk={handleDeleteModalOk}
                onCancel={handleModalCancel}
            >
                <p>Bạn có chắc chắn muốn xóa bản ghi này không?</p>
            </Modal>

            <Modal
                title="Thêm Mới"
                visible={addModalVisible}
                onOk={handleAddModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} layout="vertical">
                    {selectedMenuKey === 'sub2-1' && (
                        <>
                            <Form.Item name="name" label="Tên gói" rules={[{ required: true, message: 'Please input the name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Please input the description!' }]}>
                                {/* Use ReactQuill for rich text editor */}
                                <ReactQuill
                                    placeholder="Mô tả sản phẩm"
                                />
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="Giá"
                                rules={[
                                    { required: true, message: 'Please input the price!' },
                                    { validator: validatePrice }
                                ]}
                            >
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item
                                name="serviceId"
                                label="Loại dịch vụ"
                                rules={[{ required: true, message: 'Please select a category!' }]}
                            >
                                <Select
                                    placeholder="Chọn loại sản phẩm"

                                >
                                    {service.map((service) => (
                                        <Option key={service.id} value={service.serviceId}>
                                            {service.serviceName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            
                        </>
                    )}
                    {selectedMenuKey === 'sub2-2' && (
                        <>
                            <Form.Item name="serviceName" label="Tên dịch vụ" rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm!' }]}>
                                <Input />

                            </Form.Item>
                            <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm!' }]}>
                                <Input />

                            </Form.Item>
                            <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Please input the description!' }]}>
                                {/* Use ReactQuill for rich text editor */}
                                <ReactQuill


                                    placeholder="Nội dung"
                                />
                            </Form.Item>
                            <Form.Item name="file" label="Ảnh" rules={[{ required: true, message: 'Vui lòng tải lên một hình ảnh!' }]}>
                                <Upload
                                    beforeUpload={() => false} // Ngăn chặn tự động tải lên
                                    listType="picture"
                                    onChange={info => form.setFieldsValue({ file: info })}
                                >
                                    <Button icon={<UploadOutlined />}>Click để tải lên</Button>
                                </Upload>

                            </Form.Item>
                            <Form.Item
                                name="layout"
                                label="Kiểu hiển thị"
                                rules={[{ required: true, message: 'Please select a layout!' }]}
                            >
                                <Select placeholder="Chọn kiểu hiển thị">
                                    <Option value="image-left">Hình bên trái</Option>
                                    <Option value="image-right">Hình bên phải</Option>
                                </Select>
                            </Form.Item>
                        </>


                    )}
                </Form>
            </Modal>



            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
            />


        </Layout>
    );
};



export default DashboardPage;