---

markup: rst
title: "구성요소(Entity) 등록"
menuTitle: "구성요소(Entity) 등록"
weight: 400
chapter: true
pre: "4"

---

.. contents::
.. sectnum::
    :start: 4

.. |br| raw:: html

   <br />

구성요소(Entity) 등록
================================================

이 매뉴얼은 Smart[Fleet] 플랫폼을 사용하기 원하는 파트너들에게 플랫폼 사용을 위한 절차를 설명하기 위한 것입니다.

Device 와 플랫폼을 연동하는 방법은 `5. Device 연동 절차 <../device/>`_ 와 `7. 메시지 포맷 <../message/>`_ 을 참고하십시오. App 개발자는 `6. API 규격 <../api/>`_ 과 `9. SDK <../sdk/>`_ 를 참고하십시오.

구성요소를 등록하는 방법은 2가지가 제공되고 있습니다.

1. `Smart[Fleet] 포털 </>`__ : Smart[Fleet] 플랫폼에서 제공하는 웹 서비스를 이용하는 방법

2. `Smart[Fleet] API </apidocs>`__ : Smart[Fleet] 플랫폼에서 제공하는 HTTP 기반 Rest API를 이용하는 방법

각 등록 절차마다 두 가지 방법이 설명되어 있으니 참고하시기 바랍니다.

서비스 등록 (Service Registration)
------------------------------------------------------

Smart[Fleet] 포털을 통한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. _service-registration-portal:

.. class:: text-align-justify

1. Smart[Fleet] 메인의 ‘서비스 등록’ 버튼을 통해 등록 신청 페이지로 이동합니다.

.. image:: ../images/entity/3-1-1.png

.. class:: text-align-justify

2. 필수 항목을 작성하여 서비스 등록 신청을 하면 신청한 내용이 SKT담당자에게 전달되고 검토 결과는 입력한 이메일로 발송됩니다.

.. image:: ../images/entity/3-1-2.png

.. class:: text-align-justify

3. 서비스 등록이 완료될 경우 운영사 계정이 자동으로 생성되며 ID는 입력한 이메일 주소와 동일합니다. 비밀번호는 등록완료 안내메일의 링크를 통해 설정이 가능합니다.

API를 활용한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

포털을 통해서 회사 계정을 받은 파트너사에게 Smart[Fleet] 플랫폼에 접근할 수 있는 JWT 토큰을 제공합니다. REST API를 통해서 정상적으로 등록한 서비스의 토큰을 확인하는 방법은 다음과 같습니다.

로그인 요청 정보 API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. class:: table-width-fix
.. class:: text-align-justify

+------------+---------------------------------------------------+
| **POST**   | `/api/auth/login </apidocs>`__                    |
+------------+---------------------------------------------------+

- Header

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+--------------+--------+------------------+--------------+
| option       | Type   | Default          | Description  |
+==============+========+==================+==============+
| Content-Type | string | application/json | content type |
+--------------+--------+------------------+--------------+

- Body

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+----------+--------+-------------------------+
| Key      | Type   | Description             |
+==========+========+=========================+
| username | string | 로그인할 아이디(이메일) |
+----------+--------+-------------------------+
| password | string | 패스워드                |
+----------+--------+-------------------------+

.. role:: underline
        :class: underline

- Example Code

:underline:`Request`

.. code-block::

    content-type:"application/json"

    {
        "username":"example@example.com",
        "password":"1234"
    }

:underline:`Response (code: 200)`

.. code-block::

    {
        "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1pbkB0aG…",
        "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1…"
    }

.. class:: text-align-justify

요청이 성공하면(code:200) Response에서 인증 토큰으로 사용할 token 필드를 얻을 수 있습니다. Token 필드는 HTTP Header에 “X-Authorization"의 값으로 사용되며 로그인할 때마다 변경됩니다. 토큰이 있으면 해당 계정에 접근할 수 있으므로 외부 유출이 안되도록 주의해야 합니다.
|br|
토큰을 얻었으면 회사 정보 등록 API를 통해 서비스를 등록합니다.
|br|
요청 파라미터를 입력할 때 ServiceType이 중복되지 않도록 해야 합니다. ServiceType은 Unique 값으로 하나의 ServiceType에 한 운영사만 등록할 수 있습니다.

.. _company-registration-api:

회사 정보 등록 API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. class:: table-width-fix
.. class:: text-align-justify

+------------+----------------------------------------------------+
| **POST**   | `/api/tre/v1/company </apidocs>`__                 |
+------------+----------------------------------------------------+

- Header

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+-----------------+--------+------------------+--------------+
| option          | Type   | Default          | Description  |
+=================+========+==================+==============+
| Content-Type    | string | application/json | content type |
+-----------------+--------+------------------+--------------+
| X-authorization | string |                  | auth token   |
+-----------------+--------+------------------+--------------+

- Body

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+-------------------+---------+-----------------------------------------+
| Key               | Type    | Description                             |
+===================+=========+=========================================+
| name              | string  | 등록할 회사 명칭                        |
+-------------------+---------+-----------------------------------------+
| region            | string  | 등록할 회사 지역                        |
+-------------------+---------+-----------------------------------------+
| serviceType       | string  | 운용하는 사업 명칭                      |
+-------------------+---------+-----------------------------------------+
| picName           | string  | 등록할 COMPANY_ADMIN 이름               |
+-------------------+---------+-----------------------------------------+
| picPhone          | string  | 등록할 COMPANY_ADMIN 연락처             |
+-------------------+---------+-----------------------------------------+
| picEmail          | string  | 등록할 COMPANY_ADMIN 이메일             |
+-------------------+---------+-----------------------------------------+
| picPasswd         | string  | 등록할 COMPANY_ADMIN 패스워드           |
+-------------------+---------+-----------------------------------------+
| picDivision       | string  | 등록할 COMPANY_ADMIN 소속 부서          |
+-------------------+---------+-----------------------------------------+
| sktManagerName    | string  | SKT 담당 매니저 이름                    |
+-------------------+---------+-----------------------------------------+
| sktManagerEmail   | string  | SKT 담당 매니저 이메일                  |
+-------------------+---------+-----------------------------------------+
| cooperationTask   | string  | 협력사 정보, 협력사 업무에 대해 기술    |
+-------------------+---------+-----------------------------------------+
| description       | string  | 추가 정보                               |
+-------------------+---------+-----------------------------------------+
| notifyHost        | string  | Push 메시지 수신 서버 경로 정보         | 
+-------------------+---------+-----------------------------------------+
| notifyMsgType     | string  | 수신하고자 하는 Push 메시지 타입 정보   |
+-------------------+---------+-----------------------------------------+

- Example Code

:underline:`Request`

.. code-block::

    content-type:"application/json"
    X-Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1pbkB0aG…"

    {
        "name":"운영사A",
        "region":"대한민국",
        "serviceType":"example",
        "picName":"김담당자",
        "picEmail":"companya@example.com",
        "picPhone":"010-0000-0000",
        "picPasswd":"1234",
        "picDivision":"사업1팀",
        "sktManagerName":"박매니저",
        "sktManagerEmail":"manager@skt.com",
        "cooperationTask":"수리",
        "description":"additional description",
        "notifyHost":"http://192.168.0.100:9090/noti",
        "notifyMsgType":"0f"
    }

:underline:`Response (code: 200)`

.. code-block::

    {
        "id": {
            "id": "c7fc12a0-beea-11e7-8bdf-af923035d741"
        },
        "createdTime": 1509530124485,
        "name": "운영사A",
        "serviceType": "example",
        "master": true,
        "masterId": {
            "id": "c7fc12a0-beea-11e7-8bdf-af923035d741"
        },
        "picPasswd": "1234",
        "picName": "김담당자",
        "picPhone": "010-0000-0000",
        "picEmail": "companya@example.com",
        "picDivision": "사업1팀",
        "sktManagerName": "박매니저",
        "sktManagerEmail": "manager@skt.com",
        "cooperationTask": "수리",
        "description": "additional description",
        "notifyHost": "http://192.168.0.100:9090/noti",
        "notifyMsgType": "0f"
    }

.. class:: text-align-justify

정상적으로 등록하면(code:200) 위와 같이 생성된 회사 정보를 Response 값으로 확인할 수 있습니다.

운영사는 master 필드가 true로 출력되므로 master 필드를 통해 이 회사가 운영사로 등록됐는지 구분할 수 있습니다. 생성한 회사 계정으로 처음 로그인할 때 입력한 picEmail를 아이디, picPasswd를 패스워드로 사용합니다. 예시로 보면 아이디는 "companya@example.com", 패스워드는 "123가"입니다. 패스워드는 로그인 후에 변경할 수 있습니다.

REST API를 사용할 때 입력하는 Company ID는 Response 데이터에 있는 id 필드입니다. 예시에 있는 "c7fc12a0-beea-11e7-8bdf-af923035d741"이 Company ID입니다.esponse 데이터에 있는 id 필드입니다. 예시에 있는 "c7fc12a0-beea-11e7-8bdf-af923035d741"이 Company ID입니다.

회사(협력사) 등록 (Company (Partner) Registration)
----------------------------------------------------------------

.. _company-registration-portal:

Smart[Fleet] 포털을 통한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

1. 운영사 Admin 계정으로 로그인 후 '협력사' 메뉴에서 등록 가능합니다.

.. image:: ../images/entity/3-2-1.png

.. class:: text-align-justify

2. 협력사 리스트 페이지에서 등록버튼을 통해 등록 페이지 이동

.. class:: text-align-justify

.. image:: ../images/entity/3-2-2.png

.. class:: text-align-justify

3. 필수 항목 입력

.. image:: ../images/entity/3-2-3.png

API를 활용한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

운영사 계정을 통해서 협력사를 생성할 수 있습니다. 협력사를 등록하기 전에 운영사 계정으로 로그인하여 토큰 데이터를 얻습니다. `4.1.2.2. 회사 정보 등록 API <#4122----api>`_ 와 비교하면 계정이 가진 권한에 차이가 있을 뿐 등록 절차는 동일합니다.

로그인 요청 정보 API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. class:: table-width-fix
.. class:: text-align-justify

+------------+-----------------------------------------------+
| **POST**   | `/api/auth/login  </apidocs>`__               |
+------------+-----------------------------------------------+

- Header

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+--------------+--------+------------------+--------------+
| option       | Type   | Default          | Description  |
+==============+========+==================+==============+
| Content-Type | string | application/json | content type |
+--------------+--------+------------------+--------------+

- Body

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+----------+--------+-------------------------+
| Key      | Type   | Description             |
+==========+========+=========================+
| username | string | 로그인할 아이디(이메일) |
+----------+--------+-------------------------+
| password | string | 패스워드                |
+----------+--------+-------------------------+

.. role:: underline
        :class: underline

- Example Code

:underline:`Request`

- Example Code

:underline:`Request`

.. code-block::

        content-type:"application/json"

    {
        "username":"companya@example.com",
        "password":"1234"
    }

:underline:`Response (code: 200)`

.. code-block::

    {
        "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1pbkB0aG…",
        "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1…"
    }

.. class:: text-align-justify

요청 파라미터를 입력할 때 협력사 ServiceType에는 운영사와 동일한 ServiceType을 기입합니다. 요청이 성공하면(code:200) Response에서 인증 토큰으로 사용할 token 필드를 얻을 수 있습니다. 토큰을 얻었으면 회사 정보 등록 API를 통해 서비스를 등록합니다.

회사 정보 등록 API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. class:: table-width-fix
.. class:: text-align-justify

+-------------+------------------------------------------------+
|  **POST**   | `api/tre/v1/company </apidocs>`__              |
+-------------+------------------------------------------------+


- Header

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+-----------------+--------+------------------+--------------+
| option          | Type   | Default          | Description  |
+=================+========+==================+==============+
| Content-Type    | string | application/json | content type |
+-----------------+--------+------------------+--------------+
| X-authorization | string | application/json | auth token   |
+-----------------+--------+------------------+--------------+

- Body

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+-------------------+---------+-----------------------------------------+
| Key               | Type    | Description                             |
+===================+=========+=========================================+
| name              | string  | 등록할 회사 명칭                        |
+-------------------+---------+-----------------------------------------+
| region            | string  | 등록할 회사 지역                        |
+-------------------+---------+-----------------------------------------+
| serviceType       | string  | 운용하는 사업 명칭                      |
+-------------------+---------+-----------------------------------------+
| picName           | string  | 등록할 COMPANY_ADMIN 이름               |
+-------------------+---------+-----------------------------------------+
| picPhone          | string  | 등록할 COMPANY_ADMIN 연락처             |
+-------------------+---------+-----------------------------------------+
| picEmail          | string  | 등록할 COMPANY_ADMIN 이메일             |
+-------------------+---------+-----------------------------------------+
| picPasswd         | string  | 등록할 COMPANY_ADMIN 패스워드           |
+-------------------+---------+-----------------------------------------+
| picDivision       | string  | 등록할 COMPANY_ADMIN 소속 부서          |
+-------------------+---------+-----------------------------------------+
| sktManagerName    | string  | SKT 담당 매니저 이름                    |
+-------------------+---------+-----------------------------------------+
| sktManagerEmail   | string  | SKT 담당 매니저 이메일                  |
+-------------------+---------+-----------------------------------------+
| cooperationTask   | string  | 협력사 정보, 협력사 업무에 대해 기술    |
+-------------------+---------+-----------------------------------------+
| description       | string  | 추가 정보                               |
+-------------------+---------+-----------------------------------------+
| rpcNotifyHost     | string  | RPC 결과를 전송받기 위한 서버 호스트    |
+-------------------+---------+-----------------------------------------+
| rpcNotifyPort     | integer | RPC 결과를 전송받기 위한 서버 포트      |
+-------------------+---------+-----------------------------------------+
| rpcNotifyBasePath | string  | RPC 결과를 전송받기 위한 서버 기본 경로 |
+-------------------+---------+-----------------------------------------+

- Example Code

:underline:`Request`

.. code-block::

    content-type:"application/json"
    X-Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1pbkB0aG…"

    {
        "name":"협력사B",
        "region":"대한민국",
        "serviceType":"example",
        "picName":"김담당자",
        "picEmail":"companyb@example.com",
        "picPhone":"010-0000-0000",
        "picPasswd":"1234",
        "picDivision":"사업1팀",
        "sktManagerName":"박매니저",
        "sktManagerEmail":"manager@skt.com",
        "cooperationTask":"수리",
        "description":"additional description",
        "rpcNotifyHost":"localhost",
        "rpcNotifyPort":9000,
        "rpcNotifyBasePath":"/rpc_noti"
    }


:underline:`Response (code: 200)`

.. code-block::

    {
        "id": {
            "id": "3820ea50-beec-11e7-8bdf-af923035d741"
        },
        "createdTime": 1509530742131,
        "name": "협력사A",
        "serviceType": "example",
        "master": false,
        "masterId": {
            "id": "c7fc12a0-beea-11e7-8bdf-af923035d741"
        },
        "picPasswd": "1234",
        "picName": "김담당자",
        "picPhone": "010-0000-1111",
        "picEmail": "companya@example.com",
        "picDivision": "사업1팀",
        "sktManagerName": "박매니저",
        "sktManagerEmail": "manager@skt.com",
        "cooperationTask": "수리",
        "description": "additional description",
        "rpcNotifyHost": "localhost",
        "rpcNotifyPort": 9000,
        "rpcNotifyBasePath": "/rpc_noti"
    }

.. class:: text-align-justify

정상적으로 등록하면(code:200) 위와 같이 생성된 회사 정보를 Response 값으로 확인할 수 있습니다.

협력사는 Master 필드가 False로 출력되므로 Master 필드를 통해 이 회사가 협력사로 등록됐는지 구분할 수 있습니다. 생성한 회사 계정으로 처음 로그인할 때 입력한 picEmail를 아이디로, picPasswd를 패스워드로 사용합니다. 예시로 보면 아이디는 "companyb@example.com", 패스워드는 "1234"입니다. 패스워드는 변경할 수 있습니다.

REST API를 사용할 때 입력하는 Company ID는 Response 데이터에 있는 id입니다. 예시에 있는 "3820ea50-beec-11e7-8bdf-af923035d741"이 Company ID입니다.

차량 등록 (Vehicle Registration)
----------------------------------------------

.. _vehicle-registration-portal:

Smart[Fleet] 포털을 통한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

1. 서비스에 사용할 차량을 등록하는 단계이며, 차량메뉴에서 등록이 가능합니다.

.. image:: ../images/entity/3-3-1.png

.. class:: text-align-justify

2. 차량 리스트 페이지에서 등록 버튼을 통해 등록 페이지로 이동합니다.

.. image:: ../images/entity/3-3-2.png

.. class:: text-align-justify

3. 차량 등록 시 1대씩 등록하거나 파일을 이용하여 대량으로 등록 가능합니다.

.. image:: ../images/entity/3-3-3.png

4. 고객사가 관리중인 파일을 이용하여 대량으로 등록할 경우 CSV파일 형식만 처리 가능합니다. 파일의 양식은 샘플파일을 다운로드하여 참고할 수 있습니다.

.. image:: ../images/entity/3-3-4.png

API를 활용한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

COMPANY_ADMIN, DIRECTOR 계정은 관리하고자 하는 차량을 등록할 수 있습니다. DIRECTOR 계정으로 차량을 생성할 경우 담당 관리자로 해당 DIRECTOR가 설정됩니다. 협력사 계정으로 차량을 등록할 경우 운영사가 차량을 사용할 수 있도록 운영사를 CTOV에 추가합니다.

요청 파라미터를 입력할 때 mileage는 0을 초과해야 합니다. 파라미터를 누락하거나 0을 입력하면 에러 코드31(파라미터 누락 - Paramsameter 'mileage' can't be empty!) 오류가 발생합니다.

차량 등록 API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. class:: table-width-fix
.. class:: text-align-justify

+------------+-----------------------------------------------------+
| **POST**   | `/api/tre/v1/vehicle </apidocs>`__                  |
+------------+-----------------------------------------------------+

- Header

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+-----------------+--------+------------------+--------------+
| option          | Type   | Default          | Description  |
+=================+========+==================+==============+
| Content-Type    | string | application/json | content type |
+-----------------+--------+------------------+--------------+
| X-authorization | string |                  | auth token   |
+-----------------+--------+------------------+--------------+

- Body

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+----------------+--------+--------------+------------------+
| Key            | Type   | Enum         | Description      |
+================+========+==============+==================+
| vehicleNo      | string |              | 차량 번호        |
+----------------+--------+--------------+------------------+
| vendor         | string |              | 제조사           |
+----------------+--------+--------------+------------------+
| modelCode      | string |              | 모델 코드        |
+----------------+--------+--------------+------------------+
| modelName      | string |              | 모델 이름        |
+----------------+--------+--------------+------------------+
| modelYear      | number |              | 제조년도         |
+----------------+--------+--------------+------------------+
| missionType    | string | AUTO |br|    | 변속기 타입      |
|                |        | MANUAL       |                  |
+----------------+--------+--------------+------------------+
| fuelType       | string | DIESEL |br|  | 연료 타입        |
|                |        | GASOLINE |br||                  |
|                |        | LPG          |                  |
+----------------+--------+--------------+------------------+
| mileage        | number |              | 차량 총 주행거리 |
+----------------+--------+--------------+------------------+
| category       | string | TRUCK |br|   | 카테고리         |
|                |        | BUS |br|     |                  |
|                |        | TAXI |br|    |                  |
|                |        | PERSONAL ETC |                  |
+----------------+--------+--------------+------------------+
| usage          | string |              | 사용 용도        |
+----------------+--------+--------------+------------------+
| displacement   | number |              | 배기량           |
+----------------+--------+--------------+------------------+
| additionalInfo | string |              |                  |
+----------------+--------+--------------+------------------+

.. role:: underline
        :class: underline

- Example Code

:underline:`Request`

.. code-block::

    content-type:"application/json"
    X-Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1pbkB0aG…"

    {
        "vehicleNo": "00가0001",
        "vendor": "현대자동차",
        "modelCode": "G80",
        "modelName": "제네시스",
        "modelYear": 2017,
        "missionType": "AUTO",
        "fuelType": "DIESEL",
        "mileage":1,
        "category": "PERSONAL",
        "usage": "배송용",
        "displacement": 1999,
        "additionalInfo": "string"
    }

:underline:`Response (code: 200)`

.. code-block::

    {
        "id": {
            "id": "45f8a100-bef0-11e7-8bdf-af923035d741"
        },
        "createdTime": 1509532483338,
        "companyId": {
            "id": "c7fc12a0-beea-11e7-8bdf-af923035d741"
        },
        "directorId": {
            "id": "13814000-1dd2-11b2-8080-808080808080"
        },
        "currentDriverId": {
            "id": "13814000-1dd2-11b2-8080-808080808080"
        },
        "latestTripId": {
            "id": "13814000-1dd2-11b2-8080-808080808080"
        },
        "serviceType": "example",
        "vehicleNo": "00가0001",
        "modelName": "제네시스",
        "modelCode": "G80",
        "vendor": "현대자동차",
        "sensorCount": 0,
        "status": "DEACTIVATED",
        "additionalInfo": "string",
        "modelYear": 2017,
        "usage": "배송용",
        "category": "PERSONAL",
        "missionType": "AUTO",
        "fuelType": "DIESEL",
        "displacement": 1999,
        "mileage": 1,
        "delegateUserCount": 0,
        "lastTripMsgType": null
    }

.. class:: text-align-justify

요청이 성공하면(code:200) Response에서 차량-센서 매핑할 때 사용하는 Vehicle ID를 얻을 수 있습니다. Vehicle ID는 Response 데이터에 있는 id 필드 안 id값입니다. 예시에 있는 45f8a100-bef0-11e7-8bdf-af923035d741이 Vehicle ID입니다.

처음 등록할 때 차량은 DEACTIVATED 상태로 설정됩니다.

.. _sensor-registration:

센서 등록 (Sensor Registration)
------------------------------------------

.. _sensor-registration-portal:

Smart[Fleet] 포털을 통한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

1. 운영사 및 협력사Admin 계정으로 로그인 후 센서메뉴에서 등록 가능합니다.

.. image:: ../images/entity/3-4-1.png

.. class:: text-align-justify

2. 센서 리스트에서 등록버튼을 눌러 등록화면으로 이동합니다.

.. image:: ../images/entity/3-4-2.png

.. class:: text-align-justify

3. 차량 등록 시 1대씩 등록하거나 파일을 이용하여 대량으로 등록 가능합니다.

.. image:: ../images/entity/3-4-3.png

.. class:: text-align-justify

4. 고객사가 관리중인 파일을 이용하여 대량으로 등록할 경우 CSV파일 형식만 처리 가능합니다.
파일의 양식은 샘플파일을 다운로드하여 참고할 수 있습니다.

.. image:: ../images/entity/3-4-4.png

API를 활용한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

센서는 COMPANY_ADMIN 권한을 가진 회사 계정으로만 등록할 수 있습니다.

센서 등록 API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. class:: table-width-fix
.. class:: text-align-justify

+------------+------------------------------------------------+
| **POST**   | `/api/tre/v1/sensor </apidocs>`__              |
+------------+------------------------------------------------+


- Header

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+-----------------+--------+------------------+--------------+
| option          | Type   | Default          | Description  |
+=================+========+==================+==============+
| Content-Type    | string | application/json | content type |
+-----------------+--------+------------------+--------------+
| X-authorization | string |                  | auth token   |
+-----------------+--------+------------------+--------------+

- Body

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+--------------------+---------+-----------+---------------------------------+
| Key                | Type    | Enum      | Description                     |
+====================+=========+===========+=================================+
| serialNo           | string  |           | 센서 Serial No.                 |
+--------------------+---------+-----------+---------------------------------+
| credentialsId      | string  |           | Access Token                    |
+--------------------+---------+-----------+---------------------------------+
| vendor             | string  |           | 제조사                          |
+--------------------+---------+-----------+---------------------------------+
| type               | string  | OBD2 |br| | 센서 타입                       |
|                    |         | ADAS      |                                 |
+--------------------+---------+-----------+---------------------------------+
| activationRequired | boolean |           | RPC로 센서 활성화 필요한지 여부 |
+--------------------+---------+-----------+---------------------------------+
| missionType        | string  |           | 변속기 타입                     |
+--------------------+---------+-----------+---------------------------------+
| additionalInfo     | string  |           | 추가 정보                       |
+--------------------+---------+-----------+---------------------------------+

.. role:: underline
        :class: underline

- Example Code

:underline:`Request`

.. code-block::

    content-type:"application/json"
    X-Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1pbkB0aG…"

    {
        "serialNo": "A1",
        "credentialsId": "00000000000000000002",
        "vendor": "sk",
        "type": "OBD2",
        "activationRequired": true,
        "additionalInfo": "string"
    }


:underline:`Response (code: 200)`

.. code-block::

    {
        "id": {
            "id": "05a55bc0-bf63-11e7-8bdf-af923035d741"
        },
        "createdTime": 1509581767542,
        "vehicleId": {
            "id": "13814000-1dd2-11b2-8080-808080808080"
        },
        "companyId": {
            "id": "c7fc12a0-beea-11e7-8bdf-af923035d741"
        },
        "directorId": {
            "id": "13814000-1dd2-11b2-8080-808080808080"
        },
        "status": "DEACTIVATED",
        "vendor": "sk",
        "type": "OBD2",
        "additionalInfo": "string",
        "lastTripMsgType": null,
        "activationRequired": true,
        "vehicleNo": null,
        "serialNo": "A1",
        "credentialsId": "00000000000000000002"
    }

.. class:: text-align-justify

요청이 성공하면(code:200) Response에서 차량과 센서를 매핑할 때 사용하는 Sensor ID를 얻을 수 있습니다. Sensor ID는 Response 데이터에 있는 id 필드 내의 id 값입니다. 예시에 있는 45f8a100-bef0-11e7-8bdf-af923035d741이 Sensor ID입니다.
|br|
처음 등록할 때 센서는 DEACTIVATED 상태로 설정됩니다. 해당 센서의 activationRequired 필드가 false이면 DEACTIVATED상태일 때도 차량과 매핑이 가능합니다. 매핑하면 ACTIVATED 상태가 됩니다.

디렉터 등록 (Director Registration)
---------------------------------------------

.. _director-registration-portal:

Smart[Fleet] 포털을 통한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

1. 운영사 및 협력사 Admin로그인 후 각 회사의 디렉터를 등록할 수 있습니다.

.. image:: ../images/entity/3-5-1.png

.. class:: text-align-justify

2. 디렉터 리스트에서 등록 버튼을 눌러 등록 페이지로 이동합니다.

.. image:: ../images/entity/3-5-2.png

.. class:: text-align-justify

3. 필수 정보를 입력한 후 등록버튼을 누르면 입력한 이메일로 디렉터 등록 안내메일이 발송됩니다.

.. image:: ../images/entity/3-5-3.png

.. class:: text-align-justify

4. 수신한 협력사 등록신청 메일에서 비밀번호를 등록하면 협력사 계정 생성이 완료됩니다. ID는 입력한 이메일주소이며 비밀번호는 메일을 통해 등록한 비밀번호 입니다.

.. image:: ../images/entity/3-5-4.png

API를 활용한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

디렉터는 COMPANY_ADMIN 권한을 가진 회사 계정으로만 등록할 수 있습니다. 특정 차량들에 대해 관리자로 지정되어 관리하거나, 타 회사의 차량을 위임받아서 모니터링 할 수 있습니다.

디렉터 정보 등록 API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. class:: table-width-fix
.. class:: text-align-justify

+------------+---------------------------------------------------+
| **POST**   | `/api/tre/v1/director </apidocs>`__               |
+------------+---------------------------------------------------+

-   Header

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+-----------------+--------+------------------+--------------+
| option          | Type   | Default          | Description  |
+=================+========+==================+==============+
| Content-Type    | string | application/json | content type |
+-----------------+--------+------------------+--------------+
| X-authorization | string |                  | auth token   |
+-----------------+--------+------------------+--------------+

- Body

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+----------+--------+-------------+
| Key      | Type   | Description |
+==========+========+=============+
| name     | string | 디렉터 이름 |
+----------+--------+-------------+
| email    | string | 이메일      |
+----------+--------+-------------+
| phone    | string | 연락처      |
+----------+--------+-------------+
| password | string | 패스워드    |
+----------+--------+-------------+

.. role:: underline
        :class: underline


- Example Code

:underline:`Request`

.. code-block::

    content-type:"application/json"
    X-Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1pbkB0aG…"

    {
        "name": "디렉터C",
        "email": "directorc@example.com",
        "phone": "010-0000-0000",
        "password": "1234",
    }


:underline:`Response (code: 200)`

.. code-block::

    {
        "id": {
            "id": "8e904530-c06c-11e7-8bdf-af923035d741"
        },
        "createdTime": 1509695813887,
        "companyId": {
            "id": "c7fc12a0-beea-11e7-8bdf-af923035d741"
        },
        "name": "디렉터C",
        "phone": "010-0000-0000",
        "vehicleId": null,
        "latestTripId": {
            "id": "13814000-1dd2-11b2-8080-808080808080"
        },
        "email": "directorc@example.com",
        "authority": "DIRECTOR",
        "password": null,
        "additionalInfo": null,
        "passwordUpdatedTime": 1509695813887
    }

.. -class:: text-align-justify

등록할 때 입력한 email이 아이디입니다. Example Code에서 아이디는 directorc@example.com 이고, 패스워드는 1234 입니다. Authority 필드를 통해 해당 계정이 DIRECTOR 계정인지 DRIVER 계정인지 구분할 수 있습니다.

운전자 등록 (Driver Registration)
-------------------------------------------

.. _driver-registration-portal:

Smart[Fleet] 포털을 통한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

1. 운영사 및 협력사 Admin로그인 후 각 회사의 드라이버를 등록할 수 있습니다.

.. image:: ../images/entity/3-6-1.png

.. class:: text-align-justify

2. 드라이버 리스트에서 등록 버튼을 눌러 등록 페이지로 이동합니다.

.. image:: ../images/entity/3-6-2.png

.. class:: text-align-justify

3. 필수 정보를 입력한 후 등록버튼을 누르면 드라이버의 등록이 완료됩니다.

.. image:: ../images/entity/3-6-3.png


API를 활용한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

운전자는 COMPANY_ADMIN 권한을 가진 회사 계정으로만 등록할 수 있습니다. 차량 운행 서비스를 이용할 수 있습니다.

운전자 등록 API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. class:: table-width-fix
.. class:: text-align-justify

+------------+--------------------------------------------------------+
| **POST**   | `/api/tre/v1/driver </apidocs>`__                      |
+------------+--------------------------------------------------------+

- Header

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+-----------------+--------+------------------+--------------+
| option          | Type   | Default          | Description  |
+=================+========+==================+==============+
| Content-Type    | string | application/json | content type |
+-----------------+--------+------------------+--------------+
| X-authorization | string |                  | auth token   |
+-----------------+--------+------------------+--------------+

- Body

.. class:: table-width-fix
.. class:: text-align-justify

+----------+--------+-------------+
| Key      | Type   | Description |
+==========+========+=============+
| name     | string | 운전자 이름 |
+----------+--------+-------------+
| email    | string | 이메일      |
+----------+--------+-------------+
| phone    | string | 연락처      |
+----------+--------+-------------+
| password | string | 패스워드    |
+----------+--------+-------------+

.. role:: underline
        :class: underline

- Example Code

:underline:`Request`

.. code-block::

    content-type:"application/json"
    X-Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1pbkB0aG…"

    {
        "name": "드라이버B",
        "email": "driverb@example.com",
        "phone": "010-0000-0000",
        "password": "1234"
    }

:underline:`Response (code: 200)`

.. code-block::

    {
        "id": {
            "id": "69b5f470-c06d-11e7-8bdf-af923035d741"
        },
        "createdTime": 1509696181554,
        "companyId": {
            "id": "c7fc12a0-beea-11e7-8bdf-af923035d741"
        },
        "name": "드라이버B",
        "phone": "010-0000-0000",
        "vehicleId": null,
        "latestTripId": {
            "id": "13814000-1dd2-11b2-8080-808080808080"
        },
        "email": "driverb@example.com",
        "authority": "DRIVER",
        "password": null,
        "additionalInfo": null,
        "passwordUpdatedTime": 1509696181554
    }

.. class:: text-align-justify

등록할 때 입력한 email이 아이디가 됩니다. Example Code에서 아이디는 driverb@example.com 이고, 패스워드는 1234 입니다. Authority 필드를 통해 해당 계정이 DIRECTOR 계정인지 DRIVER 계정인지 구분할 수 있습니다.

위임 회사 등록 (Delegated Company Registration)
------------------------------------------------------------

.. _delegated-company-registration-portal:

Smart[Fleet] 포털을 통한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

1. 운영사 Admin로그인 후 협력사 메뉴에서 각 회사를 위임 회사로 설정할 수 있습니다.

.. image:: ../images/entity/3-7-1.png

.. class:: text-align-justify

2. 협력사 리스트에서 주요협력사 스위치를 눌러 활성화 합니다.

.. image:: ../images/entity/3-7-2.png

.. class:: text-align-justify

3. 주요 협력사로 선택한 회사에 차량을 위임할 수 있습니다. 해당 기능은 차량 메뉴에서 이용 가능합니다.

.. image:: ../images/entity/3-7-3.png

.. class:: text-align-justify

4. 차량 리스트 화면에서 차량 위임버튼을 눌러 위임 화면으로 이동합니다.

.. image:: ../images/entity/3-7-4.png

.. class:: text-align-justify

5. 차량과 위임 회사를 선택 후 저장 버튼을 눌러 위임을 완료 합니다.

.. image:: ../images/entity/3-7-5.png

.. class:: text-align-justify

API를 활용한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

협력 관계에 있는 회사에 차량을 위임하면 그 회사는 위임 회사가 됩니다. 그 전에 위임하는 회사가 먼저 협력사를 위임 후보 회사로 등록해야 합니다. 회사 간 ServiceType이 동일해야 합니다.

위임 후보 회사 등록 API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. class:: table-width-fix
.. class:: text-align-justify

+------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| **POST**   |`/api/tre/v1/company/{companyId}/relation/company </apidocs>`__                                                                               |
+------------+----------------------------------------------------------------------------------------------------------------------------------------------+

- Header

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+-----------------+--------+------------------+--------------+
| option          | Type   | Default          | Description  |
+=================+========+==================+==============+
| Content-Type    | string | application/json | content type |
+-----------------+--------+------------------+--------------+
| X-authorization | string |                  | auth token   |
+-----------------+--------+------------------+--------------+

- Path

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+-----------+--------+-----------------------------------+
| Key       | Type   | Description                       |
+===========+========+===================================+
| companyId | string | 자신의 회사 ID (위임하는 회사 ID) |
+-----------+--------+-----------------------------------+

- Body

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+--------------------+-------------+-----------------------------------------------+
| Key                | Type        | Description                                   |
+=============+======+=============+===============================================+
| toCompanyId | id   | string      | 위임 후보로 등록할 회사 ID (위임받는 회사 ID) |
+-------------+------+-------------+-----------------------------------------------+

.. role:: underline
        :class: underline

- Example Code

:underline:`Request`

.. code-block::

    content-type:"application/json"
    X-Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1pbkB0aG…"

    {
        "toCompanyId": {
            "id": "def51a30-c06e-11e7-8bdf-af923035d741"
        }
    }

:underline:`Response (code: 200)`

.. code-block::

    {
        "id": {
            "id": "50117bd0-c071-11e7-8bdf-af923035d741"
        },
        "createdTime": 1509697451337,
        "fromCompanyId": {
            "id": "c7fc12a0-beea-11e7-8bdf-af923035d741"
        },
        "toCompanyId": {
            "id": "def51a30-c06e-11e7-8bdf-af923035d741"
        },
        "serviceType": "example",
        "fromCompanyName": "운영사A",
        "toCompanyName": "협력사C"
    }

.. class:: text-align-justify

위임 후보 회사로 등록되어 있는 회사에 특정 차량을 위임할 수 있습니다. 차량을 위임받은 회사는 위임 후보가 아닌 위임 회사가 됩니다.

위임 후보 회사에 차량 위임 API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. class:: table-width-fix
.. class:: text-align-justify

+------------+---------------------------------------------------------------------------------------------------+
| **POST**   | `/api/tre/v1/director/{directorId}/relation/vehicle </apidocs>`__                                 |
+------------+---------------------------------------------------------------------------------------------------+

- Header

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+-------------+--------+-------------------------+
| Key         | Type   | Description             |
+=============+========+=========================+
| toCompanyId | string | 차량을 위임받을 회사 ID |
+-------------+--------+-------------------------+

- Path

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+-----------------+--------+------------------+--------------+
| option          | Type   | Default          | Description  |
+=================+========+==================+==============+
| Content-Type    | string | application/json | content type |
+-----------------+--------+------------------+--------------+
| X-authorization | string |                  | auth token   |
+-----------------+--------+------------------+--------------+

- Body

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+------------------+-------------+----------------+
| Key              | Type        | Description    |
+===========+======+=============+================+
| vehicleId | id   | string      | 위임할 차량 ID |
+-----------+------+-------------+----------------+

- Example Code

:underline:`Request`

.. code-block::

    content-type:"application/json"
    X-Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1pbkB0aG…"

    {
        "vehicleId": {
            "id": "45f8a100-bef0-11e7-8bdf-af923035d741"
        }
    }

:underline:`Response (code: 200)`

.. code-block::

    {
        "id": {
            "id": "1a598a90-c072-11e7-8bdf-af923035d741"
        },
        "createdTime": 1509698195891,
        "fromCompanyId": {
            "id": "c7fc12a0-beea-11e7-8bdf-af923035d741"
        },
        "fromCompanyName": "운영사A",
        "toCompanyId": {
            "id": "def51a30-c06e-11e7-8bdf-af923035d741"
        },
        "toCompanyName": "협력사C",
        "vehicleId": {
            "id": "45f8a100-bef0-11e7-8bdf-af923035d741"
        },
        "vehicleNo": "00가0001"
    }


위임 디렉터 등록 (Delegated Director Registration)
-------------------------------------------------------------

Smart[Fleet] 포털을 통한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

1. 차량을 디렉터에게 할당하는 기능으로 운영사 및 협력사 Admin계정으로 로그인 후 차량메뉴에서 위임 가능합니다.

.. image:: ../images/entity/3-8-1.png

.. class:: text-align-justify

2. 차량 리스트 화면에서 차량 할당버튼을 눌러 할당 화면으로 이동합니다.

.. image:: ../images/entity/3-8-2.png

.. class:: text-align-justify

3. 차량과 디렉터를 선택 후 저장 버튼을 눌러 위임을 완료 합니다.

.. image:: ../images/entity/3-8-3.png

.. class:: text-align-justify

API를 활용한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

Company_Admin, Director 권한 계정은 Director 에게 특정 차량의 권한을 위임할 수 있습니다. API를 통해 권한이 설정된 디렉터는 할당된 차량에 대해 Delegated_director 권한을 가집니다. Company_admin은 자신의 회사에 속한 차량 또는 위임 회사에 할당한 차량에 대해서만 본인이 속한 회사의 Director에게 권한을 설정 할 수 있습니다. Director는 본인이 관리하는 차량에 한해서 다른 Director 를 Delegated Director로 설정 할 수 있습니다. 단, Director 가 다른 회사 소속일 경우에는 위임 회사에 차량 위임 권한을 가진 Director일 경우에만 권한 위임이 가능합니다.

디렉터 정보 등록 API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. class:: table-width-fix
.. class:: text-align-justify

+------------+------------------------------------------------------------------------------------------+
| **POST**   | `/api/tre/v1/director/{directorId}/relation/vehicle </apidocs>`__                        |
+------------+------------------------------------------------------------------------------------------+

- Header

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+-----------------+--------+------------------+--------------+
| option          | Type   | Default          | Description  |
+=================+========+==================+==============+
| Content-Type    | string | application/json | content type |
+-----------------+--------+------------------+--------------+
| X-authorization | string |                  | auth token   |
+-----------------+--------+------------------+--------------+

- Path

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+------------+--------+---------------------------+
| Key        | Type   | Description               |
+============+========+===========================+
| directorId | string | 차량을 위임받을 디렉터 ID |
+------------+--------+---------------------------+

- Body

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+------------------+-------------+----------------+
| Key              | Type        | Description    |
+===========+======+=============+================+
| vehicleId | id   | string      | 위임할 차량 ID |
+-----------+------+-------------+----------------+

.. role:: underline
        :class: underline

- Example Code

:underline:`Request`

.. code-block::

    content-type:"application/json"
    X-Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1pbkB0aG…"

    {
        "vehicleId": {
            "id": "45f8a100-bef0-11e7-8bdf-af923035d741"
        }
    }


:underline:`Response (code: 200)`

.. code-block::

    {
        "id": {
            "id": "74d18670-c073-11e7-8bdf-af923035d741"
        },
        "createdTime": 1509698777167,
        "companyId": {
            "id": "c7fc12a0-beea-11e7-8bdf-af923035d741"
        },
        "companyName": "운영사A",
        "userId": {
            "id": "8e904530-c06c-11e7-8bdf-af923035d741"
        },
        "userName": "디렉터C",
        "vehicleId": {
            "id": "45f8a100-bef0-11e7-8bdf-af923035d741"
        },
        "vehicleNo": "00가0001",
        "userRole": "DELEGATED_DIRECTOR"
    }

위임 운전자 등록 (Delegated Driver Registration)
----------------------------------------------------------

Smart[Fleet] 포털을 통한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

1. 운영사 및 협력사 어드민, 디렉터 계정으로 로그인하여 차량 메뉴에서 등록 가능합니다.

.. image:: ../images/entity/3-9-1.png

.. class:: text-align-justify

2. 차량 정보를 눌러 상세페이지로 이동합니다.

.. image:: ../images/entity/3-9-2.png

.. class:: text-align-justify

3. 차량 상세 정보의 드라이버 영역에 드라이버 이름을 입력하면 자동으로 검색된 리스트가 표시되며 리스트에세 드라이버를 선택 후 수정버튼을 눌러 저장합니다.

.. image:: ../images/entity/3-9-3.png

API를 활용한 등록
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. class:: text-align-justify

Company_admin, director 권한 계정은 Driver 에게 특정 차량을 운행 할 수 있는 권한을 위임할 수 있습니다. API를 통해 권한이 설정된 Driver 는 해당 차량에 대해 delegated_driver 권한을 가집니다. Company_admin은 자신의 회사에 속한 차량 또는 위임회사에 할당된 차량에 대해서만 본인이 속한 회사의 driver에게 권한을 설정 할 수 있습니다.

Director는 본인이 관리하는 차량이거나 본인이 Delegated_director로 등록된 차량에 한해서 본인이 속한 회사의 driver에게 권한을 설정 할 수 있습니다.

Driver에게 이용 가능한 차량 등록 API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. class:: table-width-fix
.. class:: text-align-justify

+------------+--------------------------------------------------------------------------------+
| **POST**   | `/api/tre/v1/driver/{driverId}/relation/vehicle </apidocs>`__                  |
+------------+--------------------------------------------------------------------------------+

- Header

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

+-----------------+--------+------------------+--------------+
| option          | Type   | Default          | Description  |
+=================+========+==================+==============+
| Content-Type    | string | application/json | content type |
+-----------------+--------+------------------+--------------+
| X-authorization | string |                  | auth token   |
+-----------------+--------+------------------+--------------+

- Path

.. class:: table-width-fix
.. class:: table-width-full
.. class:: text-align-justify

==========  ========  ============================  
  Key        Type     Description                 
==========  ========  ============================
 driverId    string    차량을 위임받을 드라이버 ID       
==========  ========  ============================

- Body

.. class:: table-width-fix
.. class:: text-align-justify

===========  ========  ========  ============================  
  Key                   Type       Description                 
=====================  ========  ============================
 vehicleId   id         string     차량을 위임받을 드라이버 ID       
===========  ========  ========  ============================

.. role:: underline
        :class: underline

- Example Code

:underline:`Request`

.. code-block::

    content-type:"application/json"
    X-Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1pbkB0aG…"

    {
        "vehicleId": {
            "id": "45f8a100-bef0-11e7-8bdf-af923035d741"
        }
    }

:underline:`Response (code: 200)`

.. code-block::

    {
        "id": {
            "id": "9b631230-c074-11e7-8bdf-af923035d741"
        },
        "createdTime": 1509699271373,
        "companyId": {
            "id": "c7fc12a0-beea-11e7-8bdf-af923035d741"
        },
        "companyName": "운영사A",
        "userId": {
            "id": "69b5f470-c06d-11e7-8bdf-af923035d741"
        },
        "userName": "드라이버B",
        "vehicleId": {
            "id": "45f8a100-bef0-11e7-8bdf-af923035d741"
        },
        "vehicleNo": "00가0001",
        "userRole": "DRIVER"
    }
